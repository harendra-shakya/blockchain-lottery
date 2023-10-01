import { FC } from "react";
import Image from "next/image";
import Navbar from "../components/navbar";

const PageLoader: FC = () => {
    return (
        <div
            className={`fixed top-0 left-0 z-50 w-full h-screen overflow-auto items-center justify-center text-center text-77xl text-white font-orbitron max-w-screen pb-10 shrink-0  max-h-full bg-black`}
        >
            <Navbar />
            <div className="default-scale flex flex-col items-center ">
                <Image
                    width={200}
                    height={200}
                    className="mt-80 animate-spin"
                    alt=""
                    src="/icons/chainwarzLogo.svg"
                    priority={true}
                />
                <div className="m-0 relative default-text-77xl default-tracking leading-[80px] sm:leading-[150px] md:leading-[120px] lg:leading-[160px]  pb-20 md:pb-10 2xl:pb-0 lg:whitespace-nowrap h-shadow">
                    Loading...
                </div>
                <div className="m-0 default-text-21xl leading-[48px]  md:inline-block hidden w-full max-w-[996px] [-webkit-text-stroke:1px_#35d2e2] text-center relative">
                    Bots are working.
                </div>
            </div>
        </div>
    );
};

export default PageLoader;
