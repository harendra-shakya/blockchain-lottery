import { useMemo } from "react";
import CSS, { Property } from "csstype";
import type { NextPage } from "next";

type ParticipantsType = {
    /** Style props */
    avaPosition?: Property.Position;
    avaTop?: Property.Top;
    avaLeft?: Property.Left;
};

const Participants: NextPage<ParticipantsType> = ({ avaPosition, avaTop, avaLeft }) => {
    const groupDivStyle: CSS.Properties = useMemo(() => {
        return {
            position: avaPosition,
            top: avaTop,
            left: avaLeft,
        };
    }, [avaPosition, avaTop, avaLeft]);

    return (
        <div className="relative w-[486px] h-[453px] text-left text-5xl text-white font-body-24" style={groupDivStyle}>
            <div className="absolute top-[0px] left-[0px] tracking-[-0.04em] leading-[32px] uppercase">
                <span>{`Battle participants `}</span>
                <span className="text-gray">(24)</span>
            </div>
            <img className="absolute top-[4px] left-[462px] w-6 h-6 overflow-hidden" alt="" src="/frame-482107.svg" />
            <div className="absolute top-[53px] left-[0px] flex flex-col items-start justify-start text-base">
                <div className="box-border w-[464px] flex flex-row py-4 px-0 items-center justify-start gap-[133px] border-b-[1px] border-solid border-midnightblue-300">
                    <div className="flex flex-row items-center justify-start gap-[16px]">
                        <img
                            className="relative rounded-21xl w-12 h-12 overflow-hidden shrink-0 object-cover"
                            alt=""
                            src="/ava@2x.png"
                        />
                        <div className="flex flex-col items-start justify-start">
                            <div className="flex flex-row items-start justify-start">
                                <div className="relative leading-[24px] uppercase inline-block w-[88px] shrink-0">
                                    embfort
                                </div>
                                <img
                                    className="relative w-6 h-6 object-cover hidden"
                                    alt=""
                                    src="/victorycup63724175272718-1@2x.png"
                                />
                            </div>
                            <div className="relative leading-[24px] uppercase text-gray hidden">20 entries</div>
                        </div>
                    </div>
                    <div className="hidden flex-row items-center justify-end gap-[4px] text-cyan">
                        <div className="relative leading-[24px] uppercase">3 hours ago</div>
                        <img className="relative w-6 h-6 overflow-hidden shrink-0" alt="" src="/icons--arrow-go.svg" />
                    </div>
                </div>
                <div className="box-border w-[464px] flex flex-row py-4 px-0 items-center justify-start gap-[133px] border-b-[1px] border-solid border-midnightblue-300">
                    <div className="flex flex-row items-center justify-start gap-[16px]">
                        <div className="relative rounded-21xl bg-moderate-pink box-border w-12 h-12 overflow-hidden shrink-0 border-[2px] border-solid border-papayawhip" />
                        <div className="flex flex-col items-start justify-start">
                            <div className="relative leading-[24px] uppercase inline-block w-28">totaro</div>
                            <div className="relative leading-[24px] uppercase text-gray hidden">20 entries</div>
                        </div>
                    </div>
                    <div className="hidden flex-row items-center justify-end gap-[4px] text-cyan">
                        <div className="relative leading-[24px] uppercase">3 hours ago</div>
                        <img className="relative w-6 h-6 overflow-hidden shrink-0" alt="" src="/icons--arrow-go.svg" />
                    </div>
                </div>
                <div className="box-border w-[464px] flex flex-row py-4 px-0 items-center justify-start gap-[133px] border-b-[1px] border-solid border-midnightblue-300">
                    <div className="flex flex-row items-center justify-start gap-[16px]">
                        <div className="relative rounded-21xl [background:linear-gradient(48.73deg,_#ff817d,_#8233ff_46.35%,_#3857fd_63.02%,_#22def1)] box-border w-12 h-12 overflow-hidden shrink-0 border-[2px] border-solid border-papayawhip" />
                        <div className="flex flex-col items-start justify-start">
                            <div className="relative leading-[24px] uppercase inline-block w-28">Kiriku</div>
                            <div className="relative leading-[24px] uppercase text-gray hidden">20 entries</div>
                        </div>
                    </div>
                    <div className="hidden flex-row items-center justify-end gap-[4px] text-cyan">
                        <div className="relative leading-[24px] uppercase">3 hours ago</div>
                        <img className="relative w-6 h-6 overflow-hidden shrink-0" alt="" src="/icons--arrow-go.svg" />
                    </div>
                </div>
                <div className="box-border w-[464px] flex flex-row py-4 px-0 items-center justify-start gap-[133px] border-b-[1px] border-solid border-midnightblue-300">
                    <div className="flex flex-row items-center justify-start gap-[16px]">
                        <img
                            className="relative rounded-21xl w-12 h-12 overflow-hidden shrink-0 object-cover"
                            alt=""
                            src="/ava1@2x.png"
                        />
                        <div className="flex flex-col items-start justify-start">
                            <div className="relative leading-[24px] uppercase inline-block w-28">Kiriku</div>
                            <div className="relative leading-[24px] uppercase text-gray hidden">20 entries</div>
                        </div>
                    </div>
                    <div className="hidden flex-row items-center justify-end gap-[4px] text-cyan">
                        <div className="relative leading-[24px] uppercase">3 hours ago</div>
                        <img className="relative w-6 h-6 overflow-hidden shrink-0" alt="" src="/icons--arrow-go.svg" />
                    </div>
                </div>
                <div className="box-border w-[464px] flex flex-row py-4 px-0 items-center justify-start gap-[133px] border-b-[1px] border-solid border-midnightblue-300">
                    <div className="flex flex-row items-center justify-start gap-[16px]">
                        <img
                            className="relative rounded-21xl w-12 h-12 overflow-hidden shrink-0 object-cover"
                            alt=""
                            src="/ava2@2x.png"
                        />
                        <div className="flex flex-col items-start justify-start">
                            <div className="relative leading-[24px] uppercase inline-block w-28">Kiriku</div>
                            <div className="relative leading-[24px] uppercase text-gray hidden">20 entries</div>
                        </div>
                    </div>
                    <div className="hidden flex-row items-center justify-end gap-[4px] text-cyan">
                        <div className="relative leading-[24px] uppercase">3 hours ago</div>
                        <img className="relative w-6 h-6 overflow-hidden shrink-0" alt="" src="/icons--arrow-go.svg" />
                    </div>
                </div>
                <div className="box-border w-[464px] hidden flex-row py-4 px-0 items-center justify-start gap-[133px] border-b-[1px] border-solid border-midnightblue-300">
                    <div className="flex flex-row items-center justify-start gap-[16px]">
                        <img
                            className="relative rounded-21xl w-12 h-12 overflow-hidden shrink-0 object-cover"
                            alt=""
                            src="/ava3@2x.png"
                        />
                        <div className="flex flex-col items-start justify-start">
                            <div className="relative leading-[24px] uppercase inline-block w-28">Kiriku</div>
                            <div className="relative leading-[24px] uppercase text-gray hidden">20 entries</div>
                        </div>
                    </div>
                    <div className="hidden flex-row items-center justify-end gap-[4px] text-cyan">
                        <div className="relative leading-[24px] uppercase">3 hours ago</div>
                        <img className="relative w-6 h-6 overflow-hidden shrink-0" alt="" src="/icons--arrow-go.svg" />
                    </div>
                </div>
            </div>
            <div className="absolute top-[48px] left-[0px] rounded-t-8xs rounded-b-none bg-blue w-[486px] h-[5px]" />
            <div className="absolute top-[69px] left-[486px] rounded-t-8xs rounded-b-none bg-lightsteelblue-400 w-96 h-1.5 [transform:_rotate(90deg)] [transform-origin:0_0]" />
            <div className="absolute top-[69px] left-[486px] rounded-t-8xs rounded-b-none bg-gray w-16 h-1.5 [transform:_rotate(90deg)] [transform-origin:0_0]" />
        </div>
    );
};

export default Participants;
