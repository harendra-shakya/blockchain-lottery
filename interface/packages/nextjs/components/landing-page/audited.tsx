import React from "react";
import Image from "next/image";

function Audited() {
    return (
        <section className="bg-black w-screen max-w-screen overflow-x-hidden h-[870px] shrink-0 flex flex-col py-0 px-10 box-border items-start justify-start text-center text-77xl text-white font-orbitron">
            <div className="relative rounded-21xl [background:radial-gradient(50%_50%_at_50%_50%,_#194cc3_2.24%,_#062675_48.96%,_#031a57_72.56%)] w-[1840px] h-[870px] shrink-0 overflow-hidden">
                <p className="m-0 absolute top-[200px] left-[320px] default-tracking leading-[104px] uppercase inline-block w-[1200px] [text-shadow:0px_0px_64px_#5fb2ff] [-webkit-text-stroke:1px_#35d2e2]">
                    proudly audited by
                </p>
                <Image
                    width={400}
                    height={400}
                    loading="lazy"
                    className="absolute top-[376px] left-[320px] rounded-2xl w-96 h-[294px] overflow-hidden object-cover"
                    alt=""
                    src="/itech-labs@2x.png"
                />
                <Image
                    width={400}
                    height={400}
                    className="absolute top-[376px] left-[728px] rounded-2xl w-96 h-[294px] overflow-hidden object-cover"
                    alt=""
                    src="/certik@2x.png"
                    loading="lazy"
                />
                <Image
                    width={400}
                    height={400}
                    className="absolute top-[376px] left-[1136px] rounded-2xl w-96 h-[294px] overflow-hidden object-cover"
                    alt=""
                    src="/hacken@2x.png"
                    loading="lazy"
                />
            </div>
        </section>
    );
}

export default Audited;
