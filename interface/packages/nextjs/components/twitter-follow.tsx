import { useMemo } from "react";
import CSS, { Property } from "csstype";
import type { NextPage } from "next";

type TwitterFollowType = {
    twiiteraccName1?: string;

    /** Style props */
    propBackground?: Property.Background;
    propBackgroundColor?: Property.BackgroundColor;
};

const TwitterFollow: NextPage<TwitterFollowType> = ({ twiiteraccName1, propBackground, propBackgroundColor }) => {
    const avaStyle: CSS.Properties = useMemo(() => {
        return {
            background: propBackground,
            backgroundColor: propBackgroundColor,
        };
    }, [propBackground, propBackgroundColor]);

    return (
        <div className="relative rounded-3xl box-border w-[586px] h-[74px] shrink-0 text-left text-base text-white font-desktop-h3-72 border-[1px] border-solid border-gray">
            <div className="absolute top-[16px] left-[16px] flex flex-row items-center justify-start gap-[24px]">
                <div
                    className="relative rounded-21xl [background:linear-gradient(48.73deg,_#ff817d,_#8233ff_46.35%,_#3857fd_63.02%,_#22def1)] box-border w-[42px] h-[42px] shrink-0 overflow-hidden border-[2px] border-solid border-beige-light"
                    style={avaStyle}
                />
                <p className="m-0 relative leading-[24px] ">{twiiteraccName1}</p>
            </div>
            <div className="absolute top-[12px] left-[515px] rounded-xl bg-white shadow-[0px_8px_16px_rgba(243,_116,_132,_0.25),_0px_16px_24px_rgba(56,_147,_232,_0.15),_0px_24px_56px_rgba(120,_65,_237,_0.7)] w-[228px] overflow-hidden hidden flex-row py-4 px-6 box-border items-center justify-center text-center text-5xl">
                <div className="relative default-tracking leading-[32px]  [background:linear-gradient(48.73deg,_#ff817d,_#8233ff_46.35%,_#3857fd_63.02%,_#22def1)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                    buy more
                </div>
            </div>
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[16px] right-[21px] w-[101px] h-[42px]">
                <div className="absolute top-[0px] right-[0px] rounded-xl overflow-hidden flex flex-row py-3 px-6 items-center justify-center">
                    <div className="relative text-xs leading-[18px]  font-desktop-h3-72 text-white text-center">
                        Follow
                    </div>
                </div>
            </button>
        </div>
    );
};

export default TwitterFollow;
