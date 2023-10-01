import Image from "next/image";
import type { NextPage } from "next";

const Timer: NextPage = () => {
    return (
        <div className="bg-black mx-auto flex flex-wrap flex-col w-screen max-w-screen overflow-x-hidden  items-start justify-start text-center text-101xl text-black font-digital-7-mono border-none">
            <div className="rounded-21xl w-screen max-w-screen overflow-x-hidden h-full shrink-0 overflow-hidden default-my">
                <button className="mt-36 max-w-[996px] mx-auto cursor-pointer border-none sm:py-4 md:py-8 py-4 px-16 bg-white rounded-xl shadow-[0px_16px_16px_rgba(243,_116,_132,_0.4),_0px_24px_24px_rgba(56,_147,_232,_0.25),_0px_32px_56px_#7841ed] overflow-hidden flex flex-row items-center justify-center">
                    <div className="mx-auto text-7xl sm:text-5xl md:text-21xl default-tracking text-transparent bg-clip-text leading-[48px] uppercase font-orbitron bg-gradient-to-br from-[#ff817d] via-[#8233ff] via-[#3857fd] to-[#22def1] text-center">
                        join battle
                    </div>
                </button>
                <div className="mx-auto -ml-12 md:-ml-0">
                    <div className="mx-auto mt-6 w-[512px] h-[195px] shrink-0 overflow-hidden">
                        <Image
                            width={200}
                            height={200}
                            loading="lazy"
                            className="mx-auto w-[278px] h-[106px] md:w-[512px] md:h-[195px]"
                            alt=""
                            src="/timer.svg"
                        />

                        <p className="text-center mx-auto -mt-32 md:-mt-44 text-45xl sm:text-77xl md:text-101xl leading-[120px] text-white [text-shadow:0px_0px_6px_#0078bc]">
                            12:54:15
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timer;
