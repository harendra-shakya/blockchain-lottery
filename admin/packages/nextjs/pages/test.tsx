import type { NextPage } from "next";

const ManualBattle: NextPage = () => {
    return (
        <div className="absolute top-[152px] left-[666px] rounded-xl bg-midnightblue-100 w-[894px] h-[1226px] overflow-hidden text-left text-xs text-white font-body-2-12">
            <div className="absolute top-[103.5px] left-[23.5px] box-border w-[847px] h-px opacity-[0.12] border-t-[1px] border-solid border-white" />
            <div className="absolute top-[128px] left-[24px] flex flex-row items-start justify-start gap-[24px]">
                <div className="flex flex-col items-start justify-start gap-[4px]">
                    <div className="relative leading-[24px] uppercase">Name</div>
                    <div className="rounded-lg box-border w-[258px] flex flex-row p-4 items-center justify-start gap-[8px] text-base text-gray border-[1px] border-solid border-gray">
                        <img className="relative w-4 h-4 shrink-0" alt="" src="/user.svg" />
                        <div className="relative leading-[24px] uppercase inline-block w-[189px] shrink-0 opacity-[0.4]">
                            Nema
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-[4px]">
                    <div className="relative leading-[24px] uppercase">ticket price</div>
                    <div className="rounded-lg box-border w-[258px] flex flex-row p-4 items-center justify-start gap-[8px] text-base text-gray border-[1px] border-solid border-gray">
                        <img
                            className="relative w-4 h-4 shrink-0 overflow-hidden"
                            alt=""
                            src="/ethereumethlogo-21.svg"
                        />
                        <div className="relative leading-[24px] uppercase inline-block w-[189px] shrink-0 opacity-[0.4]">
                            12.545
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute top-[236px] left-[24px] flex flex-col items-start justify-start gap-[32px]">
                <div className="flex flex-col items-start justify-start gap-[24px]">
                    <div className="relative w-[410px] h-28 shrink-0">
                        <div className="absolute top-[0px] left-[0px] leading-[24px] uppercase">Bundle 1</div>
                        <div className="absolute top-[28px] left-[0px] flex flex-row items-end justify-start gap-[12px]">
                            <div className="flex flex-col items-start justify-start gap-[4px]">
                                <div className="relative leading-[24px] uppercase">Price</div>
                                <div className="rounded-lg box-border w-[165px] flex flex-row p-4 items-center justify-start gap-[8px] text-base text-gray border-[1px] border-solid border-gray">
                                    <img className="relative w-4 h-4 shrink-0" alt="" src="/handbag.svg" />
                                    <div className="relative leading-[24px] uppercase inline-block w-[95px] shrink-0 opacity-[0.4]">
                                        0.08 ETH
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-start gap-[4px]">
                                <div className="relative leading-[24px] uppercase">{`Entries `}</div>
                                <div className="rounded-lg box-border w-[165px] flex flex-row p-4 items-center justify-start gap-[8px] text-base text-gray border-[1px] border-solid border-gray">
                                    <img className="relative w-4 h-4 shrink-0" alt="" src="/infinity.svg" />
                                    <div className="relative leading-[24px] uppercase inline-block w-[100px] shrink-0 opacity-[0.4]">
                                        Enties 40
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg bg-midnightblue-100 box-border w-14 shrink-0 flex flex-row p-4 items-center justify-start border-[1px] border-solid border-gray">
                                <img className="relative w-6 h-6 shrink-0" alt="" src="/trash.svg" />
                            </div>
                        </div>
                    </div>
                    <div className="relative w-[410px] h-28 shrink-0">
                        <div className="absolute top-[0px] left-[0px] leading-[24px] uppercase">Bundle 2</div>
                        <div className="absolute top-[28px] left-[0px] flex flex-row items-end justify-start gap-[12px]">
                            <div className="flex flex-col items-start justify-start gap-[4px]">
                                <div className="relative leading-[24px] uppercase">Price</div>
                                <div className="rounded-lg box-border w-[165px] flex flex-row p-4 items-center justify-start gap-[8px] text-base text-gray border-[1px] border-solid border-gray">
                                    <img className="relative w-4 h-4 shrink-0" alt="" src="/handbag.svg" />
                                    <div className="relative leading-[24px] uppercase inline-block w-[95px] shrink-0 opacity-[0.4]">
                                        0.08 ETH
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-start gap-[4px]">
                                <div className="relative leading-[24px] uppercase">{`Entries `}</div>
                                <div className="rounded-lg box-border w-[165px] flex flex-row p-4 items-center justify-start gap-[8px] text-base text-gray border-[1px] border-solid border-gray">
                                    <img className="relative w-4 h-4 shrink-0" alt="" src="/infinity.svg" />
                                    <div className="relative leading-[24px] uppercase inline-block w-[100px] shrink-0 opacity-[0.4]">
                                        Enties 40
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg bg-midnightblue-100 box-border w-14 shrink-0 flex flex-row p-4 items-end justify-start border-[1px] border-solid border-gray">
                                <img className="relative w-6 h-6 shrink-0" alt="" src="/trash.svg" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-[24px]">
                    <div className="relative w-[410px] h-28 shrink-0">
                        <div className="absolute top-[0px] left-[0px] leading-[24px] uppercase">Bundle 3</div>
                        <div className="absolute top-[28px] left-[0px] flex flex-row items-end justify-start gap-[12px]">
                            <div className="flex flex-col items-start justify-start gap-[4px]">
                                <div className="relative leading-[24px] uppercase">Price</div>
                                <div className="rounded-lg box-border w-[165px] flex flex-row p-4 items-center justify-start gap-[8px] text-base text-gray border-[1px] border-solid border-gray">
                                    <img className="relative w-4 h-4 shrink-0" alt="" src="/handbag.svg" />
                                    <div className="relative leading-[24px] uppercase inline-block w-[95px] shrink-0 opacity-[0.4]">
                                        0.08 ETH
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-start gap-[4px]">
                                <div className="relative leading-[24px] uppercase">{`Entries `}</div>
                                <div className="rounded-lg box-border w-[165px] flex flex-row p-4 items-center justify-start gap-[8px] text-base text-gray border-[1px] border-solid border-gray">
                                    <img className="relative w-4 h-4 shrink-0" alt="" src="/infinity.svg" />
                                    <div className="relative leading-[24px] uppercase inline-block w-[100px] shrink-0 opacity-[0.4]">
                                        Enties 40
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg bg-midnightblue-100 box-border w-14 shrink-0 flex flex-row p-4 items-center justify-start border-[1px] border-solid border-gray">
                                <img className="relative w-6 h-6 shrink-0" alt="" src="/trash.svg" />
                            </div>
                        </div>
                    </div>
                    <div className="relative w-[410px] h-28 shrink-0">
                        <div className="absolute top-[0px] left-[0px] leading-[24px] uppercase">Bundle 4</div>
                        <div className="absolute top-[28px] left-[0px] flex flex-row items-end justify-start gap-[12px]">
                            <div className="flex flex-col items-start justify-start gap-[4px]">
                                <div className="relative leading-[24px] uppercase">Price</div>
                                <div className="rounded-lg box-border w-[165px] flex flex-row p-4 items-center justify-start gap-[8px] text-base text-gray border-[1px] border-solid border-gray">
                                    <img className="relative w-4 h-4 shrink-0" alt="" src="/handbag.svg" />
                                    <div className="relative leading-[24px] uppercase inline-block w-[95px] shrink-0 opacity-[0.4]">
                                        0.08 ETH
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-start gap-[4px]">
                                <div className="relative leading-[24px] uppercase">{`Entries `}</div>
                                <div className="rounded-lg box-border w-[165px] flex flex-row p-4 items-center justify-start gap-[8px] text-base text-gray border-[1px] border-solid border-gray">
                                    <img className="relative w-4 h-4 shrink-0" alt="" src="/infinity.svg" />
                                    <div className="relative leading-[24px] uppercase inline-block w-[100px] shrink-0 opacity-[0.4]">
                                        Enties 40
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg bg-midnightblue-100 box-border w-14 shrink-0 flex flex-row p-4 items-center justify-start border-[1px] border-solid border-gray">
                                <img className="relative w-6 h-6 shrink-0" alt="" src="/trash.svg" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-start gap-[16px]">
                    <div className="rounded-lg bg-lilac w-14 shrink-0 flex flex-row p-4 box-border items-center justify-start">
                        <img className="relative w-6 h-6 shrink-0" alt="" src="/plus.svg" />
                    </div>
                    <div className="relative leading-[24px] uppercase">add Bundle</div>
                </div>
            </div>
            <div className="absolute top-[28px] left-[24px] w-[846px] h-12 text-center text-base">
                <div className="absolute top-[4px] left-[726px] rounded-xl bg-white shadow-[0px_16px_16px_rgba(243,_116,_132,_0.4),_0px_24px_24px_rgba(56,_147,_232,_0.25),_0px_32px_56px_#7841ed] w-[120px] overflow-hidden flex flex-row py-2 px-4 box-border items-center justify-center">
                    <div className="relative leading-[24px] uppercase [background:linear-gradient(48.73deg,_#ff817d,_#8233ff_46.35%,_#3857fd_63.02%,_#22def1)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                        CREATE
                    </div>
                </div>
                <div className="absolute top-[0px] left-[0px] text-21xl tracking-[-0.04em] leading-[48px] uppercase text-left">
                    MANUAL
                </div>
            </div>
            <div className="absolute top-[892px] left-[24px] w-[213px] h-[310px]">
                <div className="absolute top-[0px] left-[0px] leading-[24px] uppercase">Battle image</div>
                <img className="absolute top-[33px] left-[0px] rounded-xl w-[213px] h-[213px]" alt="" src="/img3.svg" />
                <div className="absolute top-[262px] left-[0px] rounded-xl box-border w-[213px] overflow-hidden flex flex-row py-3 px-4 items-center justify-center gap-[10px] text-center text-base border-[1px] border-solid border-lightsteelblue-200">
                    <img className="relative w-6 h-6 shrink-0" alt="" src="/pictureinpicture.svg" />
                    <div className="relative leading-[24px] uppercase">UPLOAD image</div>
                </div>
            </div>
            <div className="absolute top-[24px] left-[309px] w-[375px] h-14 text-base">
                <div className="absolute top-[0px] left-[0px] w-[375px] h-14">
                    <div className="absolute top-[32px] left-[1px] flex flex-row items-start justify-start gap-[12px]">
                        <img
                            className="relative rounded-lg w-[136px] h-[136px] shrink-0 overflow-hidden"
                            alt=""
                            src="/che2.svg"
                        />
                        <div className="relative leading-[24px] uppercase">{`Email `}</div>
                    </div>
                    <div className="absolute top-[32px] left-[116px] flex flex-row items-start justify-start gap-[12px]">
                        <div className="relative rounded-lg box-border w-6 h-6 shrink-0 overflow-hidden border-[1px] border-solid border-gray" />
                        <div className="relative leading-[24px] uppercase">Twitter</div>
                    </div>
                    <div className="absolute top-[32px] left-[262px] flex flex-row items-start justify-start gap-[12px]">
                        <div className="relative rounded-lg box-border w-6 h-6 shrink-0 overflow-hidden border-[1px] border-solid border-gray" />
                        <div className="relative leading-[24px] uppercase">Discord</div>
                    </div>
                    <div className="absolute top-[0px] left-[0px] text-xs leading-[24px] uppercase">REQUIREMENTS</div>
                </div>
            </div>
        </div>
    );
};

export default ManualBattle;
