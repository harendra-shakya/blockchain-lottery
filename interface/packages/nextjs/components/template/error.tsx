import React from "react";
import Head from "next/head";
import Link from "next/link";
import FrontBots from "../landing-page/front-bots";
import Navbar from "../navbar";

type ErrorProps = {
    errStatus: number | string;
    errMessage?: string;
};

function ErrorPage({ errStatus, errMessage }: ErrorProps) {
    return (
        <main className={`items-center justify-start text-center text-77xl text-white$ font-orbitron`}>
            <Head>
                <title>
                    Error - {errStatus} {errMessage}
                </title>
            </Head>
            <div className="bg-gradient w-full max-w-screen h-full pb-10 shrink-0 overflow-hidden text-center text-21xl text-white font-orbitron max-h-full ">
                <Navbar />

                <div className="default-scale">
                    <div className="">
                        <p className="mt-24 pb-4 md:pb-0 default-text-21xl  leading-[60px] sm:leading-[90px] md:leading-[120px] uppercase h-shadow font-bold">
                            {errMessage}
                        </p>

                        <h1 className="relative default-text-161xl default-tracking leading-[80px] sm:leading-[150px] md:leading-[120px] lg:leading-[160px] uppercase -mt-12 pb-20 md:pb-10 2xl:pb-0 lg:whitespace-nowrap h-shadow">
                            {errStatus}
                        </h1>

                        <div className="mx-auto md:-mt-80 md:pb-16 pb-6 h-auto 2xl:w-[940px] lg:w-[780px] md:w-[740px] pt-20 xs:w-[640px] xs:h-[335px] max-w-full md:-mb-0 -mb-[370px] -mt-[210px]">
                            <FrontBots />
                        </div>
                        <p className="md:mt-8 mt-36 default-tracking leading-[48px] uppercase md:inline-block hidden w-full max-w-[996px] [-webkit-text-stroke:1px_#35d2e2] text-center relative">
                            Click here to go to home
                        </p>
                        <button
                            className={`relative mx-auto sm:-mt-2 mt-36 max-w-[996px] sm:py-4 md:py-8 py-4 px-16 flex btn`}
                        >
                            <Link href="/" className={` default-text-21xl text-gradient-tr `}>
                                Home
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ErrorPage;
