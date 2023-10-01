import Image from "next/image";
import { StaticImageData } from "next/image";
import type { NextPage } from "next";

type StepType = {
    img?: StaticImageData;
    num?: string;
    text?: string;
    alt: string;
};

const Step: NextPage<StepType> = ({ img, num, text, alt }) => {
    return (
        <div className="flex flex-wrap mx-auto w-full h-full text-center text-13xl text-white font-orbitron lg:mt-36 mt-10">
            <Image
                width={500}
                height={500}
                className={`flex flex-wrap mx-auto my-8 rounded-2xl 4xl:w-[583px] 4xl:h-[583px] 2xl:w-[500px] 2xl:h-[500px] lg:w-[450px] lg:h-[450px]  md:w-[403px] md:h-[403px] w-[343px] h-[343px] overflow-hidden object-cover`}
                alt={alt}
                src={img!}
                loading="lazy"
                placeholder="blur"
            />
            <div className="m-auto flex  flex-row items-center lg:flex-col lg:items-start justify-center gap-[32px] 2xl:-ml-40 lg:-ml-12 ">
                <div className="items-center  text-center justify-center md:rounded-3xl rounded-2xl md:p-6 p-4 border-solid border-[1px] border-[rgba(255,] md:-mt-6">
                    <p className="m-auto md:text-13xl text-center  text-5xl default-tracking uppercase w-6 h-6 md:w-10 md:h-10">
                        {num}
                    </p>
                </div>
                <p className="default-text-29xl tracking-[0.03em] leading-[56px] uppercase text-left inline-block lg:w-[487px] md:w-[300px] w-full h-shadow m-auto">
                    {text}
                </p>
            </div>
        </div>
    );
};

export default Step;
