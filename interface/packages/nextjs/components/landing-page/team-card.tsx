import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import CSS, { Property } from "csstype";
import type { NextPage } from "next";

type TeamCardType = {
    botImage?: string;
    founderName?: string;
    role?: string;
    profileLink?: string;

    /** Style props */
    propLeft?: Property.Left;
    propLeft1?: Property.Left;
};

const TeamCard: NextPage<TeamCardType> = ({ botImage, founderName, role, profileLink, propLeft, propLeft1 }) => {
    const card1Style: CSS.Properties = useMemo(() => {
        return {
            left: propLeft,
        };
    }, [propLeft]);

    const frameDiv1Style: CSS.Properties = useMemo(() => {
        return {
            left: propLeft1,
        };
    }, [propLeft1]);

    return (
        <div
            className="rounded-2xl bg-black box-border md:w-[282px] md:h-[432px] w-[161px] h-[364px] overflow-hidden text-center text-5xl md:text-13xl text-white font-orbitron border-[1px] border-solid border-gray mx-auto mb-8"
            style={card1Style}
        >
            <Image
                width={400}
                height={400}
                loading="lazy"
                className="mt-10 rounded-141xl w-[80px] h-[80px] md:w-[120px] md:h-[120px] overflow-hidden object-cover mx-auto"
                alt=""
                src={botImage!}
            />
            <div className="mt-5 flex flex-col items-center justify-start gap-[8px]" style={frameDiv1Style}>
                <p className="m-0 default-tracking leading-[30px] uppercase h-shadow">{founderName}</p>
                <p className="m-0 text-base leading-[24px] uppercase">
                    <span className="block">{role}</span>
                </p>
            </div>
            <div className="mt-4 md:mt-10 top-40 flex flex-row items-start justify-center gap-[12px]">
                <Link href={profileLink!}>
                    <button className="cursor-pointer [border:none] p-4 bg-white rounded-xl flex flex-row items-center justify-center">
                        <Image
                            width={24}
                            height={24}
                            loading="lazy"
                            className="w-6 h-6 shrink-0 overflow-hidden"
                            alt=""
                            src="/twitterLogo.svg"
                        />
                    </button>{" "}
                </Link>
            </div>
        </div>
    );
};

export default TeamCard;
