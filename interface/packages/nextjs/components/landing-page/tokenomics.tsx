import Image from "next/image";
import type { NextPage } from "next";

const Tokenomics: NextPage = () => {
    return (
        <section className="relative bg-black w-screen max-w-screen h-[1461px] shrink-0 overflow-hidden text-center text-77xl text-white font-orbitron">
            <h2 className="mx-auto text-center text-29xl md:text-53xl lg:text-77xl top-[200px] default-tracking leading-[104px] uppercase">
                tokenomics
            </h2>
            <div className="absolute top-[376px] left-[50%] transform -translate-x-1/2 w-full lg:w-[1095px] h-[885px] text-left text-53xl">
                <Image
                    width={500}
                    height={500}
                    loading="lazy"
                    className="absolute top-[33.11px] left-[2px] w-full lg:w-[992px] h-auto"
                    alt=""
                    src="/tokenomic.svg"
                />
                <div className="absolute top-60 md:top-[407px] lg:top-[637px] md:left-[50%] left-[40%] transform  flex flex-col items-start justify-start ">
                    <p className="m-0 relative text-77xl md:text-123xl lg:text-227xl tracking-[-0.06em] leading-[200px] uppercase h-shadow">
                        80%
                    </p>
                    <p className="m-0 relative -top-20 lg:-top-0 text-29xl md:text-59xl lg:text-77xl default-tracking leading-[104px] uppercase h-shadow">
                        winner
                    </p>
                </div>
                <div className="absolute -top-16 md:left-[50%] left-[75%] transform -translate-x-1/2 lg:left-[306px] flex flex-col items-start justify-start text-lilac">
                    <div className="relative text-29xl lg:text-53xl default-tracking leading-[80px] uppercase">10%</div>
                    <div className="relative text-xl lg:text-5xl default-tracking leading-[32px] uppercase">
                        stakers
                    </div>
                </div>
                <div className="absolute lg:top-[52px] -top-16 md:left-[30%] left-[45%] transform -translate-x-1/2 lg:left-[144px] flex flex-col items-start justify-start text-blue">
                    <div className="relative text-29xl lg:text-53xl default-tracking leading-[80px] uppercase">5%</div>
                    <div className="relative text-xl lg:text-5xl default-tracking leading-[32px] uppercase">team</div>
                </div>
                <div className="absolute lg:top-[155px] -top-8 md:-top-4 md:left-[20%] left-[35%] transform -translate-x-1/2 lg:left-0 flex flex-col items-start justify-start text-cyan">
                    <div className="relative text-29xl lg:text-53xl default-tracking leading-[80px] uppercase">5%</div>
                    <div className="relative text-xl lg:text-5xl default-tracking leading-[32px] uppercase inline-block w-full lg:w-[243px]">
                        weekly jackpot battle
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tokenomics;
