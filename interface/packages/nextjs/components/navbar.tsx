import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaucetButton, RainbowKitCustomConnectButton } from "./scaffold-eth";
import axios from "axios";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/solid";
import truncateAddressForUsername from "~~/lib/Truncate/truncateAddressForUsername";

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

const Navbar: NextPage = () => {
    const [open, setOpen] = useState(false);
    const { address, isConnected } = useAccount();

    useEffect(() => {
        if (isConnected) {
            newUser();
        }
    }, [isConnected, address]);

    const newUser = async () => {
        let res;

        try {
            res = await axios.post("/api/newUser", {
                data: {
                    walletAddress: address,
                    username: truncateAddressForUsername(address!),
                },
            });

            if (res.status === 201) {
                alert(res.data.error);
            }
        } catch (error: any) {
            console.log("Error", error);
        }
    };

    const menu = (
        <>
            <Link
                href="/allowlist"
                className={` no-underline hover:text-blue ${open ? "text-white" : "text-black"}`}
                onClick={() => {
                    Link;
                    setOpen(false);
                }}
            >
                <p>Allowlist</p>
            </Link>

            <Link
                href={`${NEXT_PUBLIC_APP_URL}/#how-it-works`}
                className={` no-underline hover:text-blue ${open ? "text-white" : "text-black"}`}
                onClick={() => setOpen(false)}
            >
                <p>How it works</p>
            </Link>

            <Link
                href={`${NEXT_PUBLIC_APP_URL}/#about-us`}
                className={` no-underline hover:text-blue ${open ? "text-white" : "text-black"}`}
                onClick={() => setOpen(false)}
            >
                <p>About Us</p>
            </Link>

            <Link
                href={`${NEXT_PUBLIC_APP_URL}/#faqs`}
                className={` no-underline hover:text-blue ${open ? "text-white" : "text-black"}`}
                onClick={() => setOpen(false)}
            >
                <p>FAQS</p>
            </Link>
            <Link
                href={`${NEXT_PUBLIC_APP_URL}/battles`}
                className={` no-underline hover:text-blue ${open ? "text-white" : "text-black"}`}
                onClick={() => setOpen(false)}
            >
                <p>Battle</p>
            </Link>
        </>
    );
    const navbarMenu = (
        <div className="flex flex-row items-center justify-center gap-[32px] text-base leading-[24px]  font-orbitron text-black text-center">
            {menu}
        </div>
    );

    const connectButton = (connectStyle: string, userBtnStyle: string) => (
        <>
            {/* <button
                    className={`cursor-pointer grow [border:none] pt-3 px-4 pb-2.5 bg-[transparent] rounded-xl [background:linear-gradient(48.73deg,_#ff817d,_#8233ff_46.35%,_#3857fd_63.02%,_#22def1)] overflow-hidden flex-row items-center justify-center  ${connectStyle}`}
                >
                    <p className="m-0 relative text-base leading-[24px]  font-orbitron text-white text-center">
                        Connect
                    </p>
                </button> */}

            <div
                className={`m-0 relative text-base leading-[24px]  font-orbitron text-white text-center ${connectStyle} ${userBtnStyle}`}
            >
                {/* <ConnectButton /> */}
                <RainbowKitCustomConnectButton />
                <FaucetButton />
            </div>

            {/* <div className={`${connectStyle}`}>
                <RainbowKitCustomConnectButton />
                <FaucetButton />
            </div> */}

            {/* <button
                    className={`cursor-pointer [border:none] p-[11px] bg-blue rounded-xl overflow-hidden flex-row items-center justify-center ${userBtnStyle}`}
                >
                    <Image width={100} height={100}  className="relative w-6 h-6 shrink-0" alt="" src="/user.svg"                 loading="lazy"
    />
                </button> */}
        </>
    );

    const mobileNav = (
        <div className="mt-40 absolute w-full h-full text-21xl md:text-29xl  items-center justify-center gap-[40px] default-tracking leading-[40px]  text-center">
            {menu}
            <div className="flex flex-row items-center justify-center gap-[12px] border-y-[1px] border-solid border-[#3B57EE]  py-10 scale-125 md:scale-150">
                {connectButton("", "")}
            </div>
        </div>
    );

    return (
        <>
            <nav className="relative top-[8px] left-2/4 z-[999] flex w-full max-w-screen-xl -translate-x-2/4 flex-wrap items-center 2xs:fixed rounded-3xl bg-white [backdrop-filter:blur(12px)] flex-row py-3 px-6 box-border justify-between">
                <div className="relative w-[175px] h-[56.12px] shrink-0 overflow-hidden hover:opacity-[0.60] ">
                    <Link href="/">
                        <Image
                            width={200}
                            height={200}
                            className="absolute top-[0px] left-[0.29px] w-[61.75px] h-[45.89px] md:w-[71.75px] md:h-[55.89px]"
                            alt=""
                            src="/icons/chainwarz.png"
                            loading="lazy"
                        />
                        <Image
                            width={200}
                            height={200}
                            className="absolute top-[6.98px] left-[72.3px] md:top-[9.98px] md:left-[82.3px] w-[77.91px] h-[35.79px] md:w-[87.91px] md:h-[35.79px]"
                            alt=""
                            src="/icons/chainwarzName.svg"
                            loading="lazy"
                        />
                    </Link>
                </div>
                <div className="hidden lg:block">{navbarMenu}</div>
                <div className="flex flex-row items-center justify-start gap-[12px]">
                    {connectButton("hidden lg:block", "hidden lg:block")}
                    {open ? (
                        <>
                            <button className="cursor-pointer [border:none] p-[11px] bg-lilac rounded-xl overflow-hidden flex flex-row items-center justify-center">
                                <XMarkIcon className="w-6 h-6 fill-white" onClick={() => setOpen(false)} />
                            </button>
                        </>
                    ) : (
                        <button className="lg:hidden block cursor-pointer [border:none] p-[11px] bg-blue rounded-xl overflow-hidden flex-row items-center justify-center">
                            <Bars2Icon className="w-6 h-6 fill-white" onClick={() => setOpen(true)} />
                        </button>
                    )}
                </div>
            </nav>
            {open ? (
                <nav className="fixed z-[998] overscroll-hidden block top-[0px] left-[0px] bg-black w-full overflow-none h-screen object-cover">
                    <div className="">{mobileNav}</div>
                </nav>
            ) : (
                <></>
            )}
        </>
    );
};

export default Navbar;

// <div className="absolute top-[0px] left-[0px] bg-black w-[375px] h-[812px]" />
