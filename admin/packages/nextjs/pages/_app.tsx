import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Head from "next/head";
import Router from "next/router";
// import Head from "next/head";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { useDarkMode } from "usehooks-ts";
import { WagmiConfig } from "wagmi";
import PageLoader from "~~/components/page-loader";
// const Footer = dynamic(() => import("../components/footer"));
// import Navbar from "~~/components/navbar";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
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

const ChainWarzAdmin = ({ Component, pageProps }: AppProps) => {
    const price = useNativeCurrencyPrice();
    const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);
    // This variable is required for initial client side rendering of correct theme for RainbowKit
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const { isDarkMode } = useDarkMode();

    useEffect(() => {
        if (price > 0) {
            setNativeCurrencyPrice(price);
        }
    }, [setNativeCurrencyPrice, price]);

    useEffect(() => {
        setIsDarkTheme(isDarkMode);
    }, [isDarkMode]);

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        Router.events.on("routeChangeStart", () => setLoading(true));
        Router.events.on("routeChangeComplete", () => setLoading(false));
        Router.events.on("routeChangeError", () => setLoading(false));

        // typeof window != "undefined" &&

        return () => {
            Router.events.off("routeChangeStart", () => setLoading(true));
            Router.events.off("routeChangeComplete", () => setLoading(false));
            Router.events.off("routeChangeError", () => setLoading(false));
        };
    }, [Router.events]);

    return (
        <SessionProvider session={pageProps.session}>
            <WagmiConfig client={wagmiClient}>
                <NextNProgress />
                <RainbowKitProvider
                    chains={appChains.chains}
                    avatar={BlockieAvatar}
                    theme={isDarkTheme ? darkTheme() : lightTheme()}
                >
                    {/* <Navbar /> */}
                    <Head>
                        <title>Chain Warz | Admin</title>

                        <meta name="title" content="Chain Warz | Admin" />
                        <link rel="preload" href="/fonts/Orbitron.woff2" as="font" type="font/woff2" />
                        <link rel="icon" href="/chainwarzLogo.svg" />
                        <meta name="robots" content="noindex, nofollow" />
                    </Head>
                    <div className={`${orbitron.variable} font-orbitron`}>
                        {loading && <PageLoader />}
                        <Component {...pageProps} />
                        <Toaster />
                    </div>
                </RainbowKitProvider>
            </WagmiConfig>
        </SessionProvider>
    );
};

export default ChainWarzAdmin;
