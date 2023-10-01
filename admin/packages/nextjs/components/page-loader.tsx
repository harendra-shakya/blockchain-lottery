import Image from "next/image";

export default function PageLoader() {
    return (
        <div
            className={`z-999 items-center justify-center text-center text-77xl  text-white font-orbitron w-full max-w-screen h-screen pb-10 shrink-0 overflow-hidden  max-h-full`}
        >
            <div className="default-scale flex flex-col items-center ">
                <Image
                    width={200}
                    height={200}
                    className="mt-80 animate-spin"
                    alt=""
                    src="/chainwarzLogo.svg" // leftBot@2x.png -> 2@2x.png
                    priority={true}
                />
                <h1 className="m-0 relative default-text-77xl default-tracking leading-[80px] sm:leading-[150px] md:leading-[120px] lg:leading-[160px]  pb-20 md:pb-10 2xl:pb-0 lg:whitespace-nowrap h-shadow">
                    Loading...
                </h1>
                <p className="m-0 default-text-21xl leading-[48px]  md:inline-block hidden w-full max-w-[996px] [-webkit-text-stroke:1px_#35d2e2] text-center relative">
                    Bots are working.
                </p>
            </div>
        </div>
    );
}
