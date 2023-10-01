import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Head from "next/head";
import Router from "next/router";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { useDarkMode } from "usehooks-ts";
import { WagmiConfig } from "wagmi";
import DepositEthModal from "~~/components/modals/DepositEthModal";
import PageLoader from "~~/components/page-loader";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { ModalProvider } from "~~/hooks/useModal";
import createEmotionCache from "~~/lib/createEmotionCache";
import { useGlobalState } from "~~/services/store/store";
import { wagmiClient } from "~~/services/web3/wagmiClient";
import { appChains } from "~~/services/web3/wagmiConnectors";
import "~~/styles/global.css";

const orbitron = localFont({
    src: "../public/fonts/Orbitron.woff2",
    weight: "700",
    display: "swap",
    variable: "--font-orbitron",
    style: "normal",
});
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    const price = useNativeCurrencyPrice();
    const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);
    // This variable is required for initial client side rendering of correct theme for RainbowKit
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const { isDarkMode } = useDarkMode();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (price > 0) {
            setNativeCurrencyPrice(price);
        }
    }, [setNativeCurrencyPrice, price]);

    useEffect(() => {
        setTimeout(() => setLoading(false), 2000);
        setIsDarkTheme(isDarkMode);
    }, [isDarkMode]);

    useEffect(() => {
        Router.events.on("routeChangeStart", () => setLoading(true));
        Router.events.on("routeChangeComplete", () => setLoading(false));
        Router.events.on("routeChangeError", () => setLoading(false));

        return () => {
            Router.events.off("routeChangeStart", () => setLoading(true));
            Router.events.off("routeChangeComplete", () => setLoading(false));
            Router.events.off("routeChangeError", () => setLoading(false));
        };
    }, [Router.events]);

    return (
        <CacheProvider value={emotionCache}>
            <WagmiConfig client={wagmiClient}>
                <NextNProgress />
                <RainbowKitProvider
                    chains={appChains.chains}
                    avatar={BlockieAvatar}
                    theme={isDarkTheme ? darkTheme() : lightTheme()}
                >
                    <Head>
                        <meta name="viewport" content="width=device-width, initial-scale=1" />

                        <link rel="preload" href="/fonts/Orbitron.woff2" as="font" type="font/woff2" />
                    </Head>
                    <div className={`${orbitron.variable} font-orbitron`}>
                        <ModalProvider>
                            {loading && <PageLoader />}
                            <Component {...pageProps} />
                            <DepositEthModal />
                            <Toaster />
                        </ModalProvider>
                    </div>
                </RainbowKitProvider>
            </WagmiConfig>
        </CacheProvider>
    );
}
