import React from "react";
import Image from "next/image";
import Link from "next/link";

type ErrorProps = {
    errStatus: number | string;
    errMessage?: string;
};

function ErrorPage({ errStatus, errMessage }: ErrorProps) {
    return (
        <div
            className={`z-999 items-center justify-center text-center text-77xl  text-white font-orbitron w-full max-w-screen h-screen pb-10 shrink-0 overflow-hidden  max-h-full`}
        >
            <div className="default-scale flex flex-col items-center ">
                <h1 className="m-0 mt-60 relative default-text-77xl default-tracking leading-[80px] sm:leading-[150px] md:leading-[120px] lg:leading-[160px]  pb-20 md:pb-10 2xl:pb-0 lg:whitespace-nowrap h-shadow">
                    {errStatus}
                </h1>
                <Image
                    width={200}
                    height={200}
                    className=""
                    alt=""
                    src="/chainwarzLogo.svg" // leftBot@2x.png -> 2@2x.png
                    priority={true}
                />

                <p className="default-text-21xl leading-[48px]  md:inline-block hidden w-full max-w-[996px] [-webkit-text-stroke:1px_#35d2e2] text-center relative">
                    {errMessage}
                </p>
                <Link href="/" className="no-underline">
                    <button
                        className={`relative mx-auto sm:-mt-2 mt-36 max-w-[996px] sm:py-4 md:py-8 py-4 px-16 flex btn`}
                    >
                        <div className="default-text-21xl text-gradient-tr">Home</div>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default ErrorPage;
