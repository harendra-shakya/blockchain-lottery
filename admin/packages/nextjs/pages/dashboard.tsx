import Image from "next/image";
import type { NextPage } from "next";
import AdminLayout from "~~/components/layouts/admin-layout";

const Dashboard: NextPage = () => {
    const ConnectedWallets = ({ imgName, num }: { imgName: string; num: string }) => (
        <div className="flex flex-row whitespace-nowrap items-center justify-start gap-[8px] p-2">
            <Image
                width={24}
                height={24}
                loading="lazy"
                className="relative w-9 h-9 shrink-0 overflow-hidden"
                alt=""
                src={imgName}
            />
            <div className="relative leading-[24px] uppercase">{num}</div>
        </div>
    );

    return (
        <AdminLayout>
            <div className="default-scale">
                {/** Section */}
                <div className="my-2 flex flex-row justify-between rounded-xl bg-midnightblue-100 w-[894px] h-[88px] overflow-hidden items-center">
                    <div className=" flex flex-row items-center gap-[8px] pl-6">
                        <div className="rounded bg-midnightblue-200 flex flex-row p-2 items-center justify-center">
                            <Image
                                width={24}
                                height={24}
                                loading="lazy"
                                className="relative w-5 h-5 shrink-0"
                                alt=""
                                src="/users4.svg"
                            />
                        </div>
                        <p className=" leading-[20px] uppercase">online users</p>
                    </div>
                    <div className="flex flex-row items-center w-[172px] h-10 text-13xl">
                        <Image width={24} height={24} loading="lazy" className="w-8 h-8" alt="" src="/usercircle.svg" />
                        <div className=" leading-[40px] uppercase">20,234</div>
                    </div>
                </div>

                <div className="flex flex-row">
                    {/** Section */}
                    <div className="flex flex-col rounded-xl bg-midnightblue-100 w-[282px] h-[326px] overflow-hidden text-base">
                        <div className="flex flex-row items-center justify-center gap-[8px] text-sm p-4">
                            <div className="rounded bg-midnightblue-200 flex flex-row p-2 items-center justify-center">
                                <Image
                                    width={24}
                                    height={24}
                                    loading="lazy"
                                    className="relative w-5 h-5 shrink-0"
                                    alt=""
                                    src="/walletIcon.svg"
                                />
                            </div>
                            <p className="m-0 relative tracking-[-0.04em] leading-[20px] uppercase inline-block w-[190px] shrink-0">
                                Number of Wallets
                            </p>
                        </div>
                        <div className=" box-border w-[235px] h-px opacity-[0.12] border-t-[1px] border-solid border-white" />

                        <div className="flex flex-col p-6">
                            <ConnectedWallets imgName="/metamask.svg" num="12,545" />
                            <ConnectedWallets imgName="/coinbaseiconsymbol1-1.svg" num="10,545" />
                            <ConnectedWallets imgName="/walletconnect.svg" num="18,545" />
                        </div>
                    </div>
                    {/** Section */}
                    {/* <div className="absolute top-[208px] left-[972px] rounded-xl bg-midnightblue-100 w-[588px] h-[326px] overflow-hidden text-base">
                        <div className="flex flex-row items-center p-4 justify-between">
                            <div className=" flex flex-row items-center justify-start gap-[8px] text-sm">
                                <div className="rounded bg-midnightblue-200 flex flex-row p-2 items-center justify-center">
                                    <Image width={24} height={24} loading="lazy"  className="relative w-5 h-5 shrink-0" alt="" src="/hash.svg" />
                                </div>
                                <p className="m-0 relative tracking-[-0.04em] leading-[20px] uppercase">stakers</p>
                            </div>
                            <div className=" " />
                            <div className=" flex flex-row items-center justify-start gap-[8px]">
                                <Image width={24} height={24} loading="lazy"  className="relative w-6 h-6 shrink-0" alt="" src="/handshake.svg" />
                                <div className="relative leading-[24px] uppercase">7859</div>
                            </div>
                            <div className=" leading-[24px] uppercase">88%</div>
                        </div>

                        <div className="absolute top-[92px] left-[71px] leading-[24px] uppercase text-moderate-pink">
                            30 Days
                        </div>
                        <div className="absolute top-[92px] left-[256px] leading-[24px] uppercase text-lilac">
                            60 Days
                        </div>
                        <div className="absolute top-[92px] left-[442px] leading-[24px] uppercase text-blue">
                            90 Days
                        </div>
                        <div className="absolute top-[75.5px] left-[23.5px] box-border w-[541px] h-px opacity-[0.12] border-t-[1px] border-solid border-white" />
                        <div className="absolute top-[132px] left-[24px] w-[170px] h-[170px] text-5xl">
                            <Image width={24} height={24} loading="lazy" 
                                className="absolute top-[-16px] left-[-4.29px] w-[198.29px] h-[210px]"
                                alt=""
                                src="/chart.svg"
                            />
                            <div className="absolute top-[60px] left-[49px] flex flex-col items-center justify-start">
                                <div className="relative tracking-[-0.04em] leading-[32px] uppercase">76%</div>
                                <p className="m-0 relative text-sm leading-[20px] uppercase mt-[-2px]">Stakers</p>
                            </div>
                        </div>
                        <div className="absolute top-[132px] left-[209px] w-[170px] h-[170px] text-5xl">
                            <Image width={24} height={24} loading="lazy" 
                                className="absolute top-[-16px] left-[-4.29px] w-[198.29px] h-[210px]"
                                alt=""
                                src="/chart1.svg"
                            />
                            <Image width={24} height={24} loading="lazy" 
                                className="absolute h-[71.76%] w-[71.76%] top-[14.12%] right-[14.12%] bottom-[14.12%] left-[14.12%] max-w-full overflow-hidden max-h-full opacity-[0.1]"
                                alt=""
                                src="/ellipse-16.svg"
                            />
                            <div className="absolute top-[60px] left-[49px] flex flex-col items-center justify-start">
                                <div className="relative tracking-[-0.04em] leading-[32px] uppercase">76%</div>
                                <p className="m-0 relative text-sm leading-[20px] uppercase mt-[-2px]">Stakers</p>
                            </div>
                        </div>
                        <div className="absolute top-[132px] left-[394px] w-[170px] h-[170px] text-5xl">
                            <Image width={24} height={24} loading="lazy" 
                                className="absolute top-[-16px] left-[-4.29px] w-[198.29px] h-[210px]"
                                alt=""
                                src="/chart2.svg"
                            />
                            <Image width={24} height={24} loading="lazy" 
                                className="absolute h-[71.76%] w-[71.76%] top-[14.12%] right-[14.12%] bottom-[14.12%] left-[14.12%] max-w-full overflow-hidden max-h-full opacity-[0.1]"
                                alt=""
                                src="/ellipse-161.svg"
                            />
                            <div className="absolute top-[60px] left-[49px] flex flex-col items-center justify-start">
                                <div className="relative tracking-[-0.04em] leading-[32px] uppercase">76%</div>
                                <p className="m-0 relative text-sm leading-[20px] uppercase mt-[-2px]">Stakers</p>
                            </div>
                        </div>
                    </div> */}
                </div>

                {/** Section */}
                {/* <div className="absolute top-[558px] left-[666px] rounded-xl bg-midnightblue-100 w-[894px] h-[356px] overflow-hidden text-xs">
                    <div className="absolute top-[24px] left-[24px] flex flex-row items-center justify-start gap-[8px] text-sm">
                        <div className="rounded bg-midnightblue-200 flex flex-row p-2 items-center justify-center">
                            <Image width={24} height={24} loading="lazy"  className="relative w-5 h-5 shrink-0" alt="" src="/users4.svg" />
                        </div>
                        <p className="m-0 relative tracking-[-0.04em] leading-[20px] uppercase">Prize ALLOCATION</p>
                    </div>
                    <div className="absolute top-[92px] left-[658px] w-[130px] h-[182px]">
                        <div className="absolute top-[0px] left-[0px] flex flex-row items-center justify-start gap-[16px]">
                            <div className="rounded bg-lilac flex flex-row p-3 items-center justify-center">
                                <Image width={24} height={24} loading="lazy" 
                                    className="relative w-5 h-5 shrink-0 overflow-hidden"
                                    alt=""
                                    src="/ethereumethlogo-22.svg"
                                />
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <div className="relative leading-[18px] uppercase">TEAM</div>
                                <div className="relative text-base tracking-[-0.04em] leading-[32px] uppercase">
                                    132,645
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-[66px] left-[0px] flex flex-row items-center justify-start gap-[16px]">
                            <div className="rounded bg-blue flex flex-row p-3 items-center justify-center">
                                <Image width={24} height={24} loading="lazy" 
                                    className="relative w-5 h-5 shrink-0 overflow-hidden"
                                    alt=""
                                    src="/ethereumethlogo-22.svg"
                                />
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <div className="relative leading-[18px] uppercase">STAKERS</div>
                                <div className="relative text-base tracking-[-0.04em] leading-[32px] uppercase">
                                    12,109
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-[132px] left-[0px] flex flex-row items-center justify-start gap-[16px]">
                            <div className="rounded bg-cyan flex flex-row p-3 items-center justify-center">
                                <Image width={24} height={24} loading="lazy" 
                                    className="relative w-5 h-5 shrink-0 overflow-hidden"
                                    alt=""
                                    src="/ethereumethlogo-22.svg"
                                />
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <div className="relative leading-[18px] uppercase">WINNERS</div>
                                <div className="relative text-base tracking-[-0.04em] leading-[32px] uppercase">
                                    65,376
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-[75.5px] left-[23.5px] box-border w-[847px] h-px opacity-[0.12] border-t-[1px] border-solid border-white" />
                    <div className="absolute top-[92px] left-[20px] w-[582px] h-[238px] text-right text-3xs">
                        <div className="absolute top-[0px] left-[0px] w-[582px] h-[17px] flex flex-row items-center justify-start gap-[8px]">
                            <p className="m-0 relative leading-[20px] flex items-center w-[47px] h-5 shrink-0">
                                1,000.00
                            </p>
                            <Image width={24} height={24} loading="lazy" 
                                className="relative w-[527px] h-px shrink-0 opacity-[0.4]"
                                alt=""
                                src="/vector-66.svg"
                            />
                        </div>
                        <div className="absolute top-[41px] left-[0px] w-[582px] h-[18px] flex flex-row items-center justify-start gap-[8px]">
                            <p className="m-0 relative leading-[20px] flex items-center w-[47px] h-5 shrink-0">
                                800.00
                            </p>
                            <Image width={24} height={24} loading="lazy" 
                                className="relative w-[527px] h-px shrink-0 opacity-[0.4]"
                                alt=""
                                src="/vector-65.svg"
                            />
                        </div>
                        <div className="absolute top-[83px] left-[0px] w-[582px] h-[17px] flex flex-row items-center justify-start gap-[8px]">
                            <p className="m-0 relative leading-[20px] flex items-center w-[47px] h-5 shrink-0">
                                600.00
                            </p>
                            <Image width={24} height={24} loading="lazy" 
                                className="relative w-[527px] h-px shrink-0 opacity-[0.4]"
                                alt=""
                                src="/vector-66.svg"
                            />
                        </div>
                        <div className="absolute top-[124px] left-[0px] w-[582px] h-[17px] flex flex-row items-center justify-start gap-[8px]">
                            <p className="m-0 relative leading-[20px] flex items-center w-[47px] shrink-0">400.00</p>
                            <Image width={24} height={24} loading="lazy" 
                                className="relative w-[527px] h-px shrink-0 opacity-[0.4]"
                                alt=""
                                src="/vector-66.svg"
                            />
                        </div>
                        <div className="absolute top-[165px] left-[0px] w-[582px] h-[18px] flex flex-row items-center justify-start gap-[8px]">
                            <p className="m-0 relative leading-[20px] flex items-center w-[47px] shrink-0">200.00</p>
                            <Image width={24} height={24} loading="lazy" 
                                className="relative w-[527px] h-px shrink-0 opacity-[0.4]"
                                alt=""
                                src="/vector-65.svg"
                            />
                        </div>
                        <div className="absolute top-[207px] left-[0px] w-[582px] h-[17px] flex flex-row items-center justify-start gap-[8px]">
                            <p className="m-0 relative leading-[20px] flex items-center w-[47px] shrink-0">0</p>
                            <Image width={24} height={24} loading="lazy" 
                                className="relative w-[527px] h-px shrink-0 opacity-[0.4]"
                                alt=""
                                src="/vector-62.svg"
                            />
                        </div>
                        <div className="absolute top-[221px] left-[62px] w-[520px] h-[17px] flex flex-row items-center justify-center text-center text-xs">
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <p className="m-0 relative leading-[20px]">1</p>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <p className="m-0 relative leading-[20px]">2</p>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <p className="m-0 relative leading-[20px]">3</p>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <p className="m-0 relative leading-[20px]">4</p>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <p className="m-0 relative leading-[20px]">5</p>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <p className="m-0 relative leading-[20px]">6</p>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <p className="m-0 relative leading-[20px]">7</p>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <p className="m-0 relative leading-[20px]">8</p>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <p className="m-0 relative leading-[20px]">9</p>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <p className="m-0 relative leading-[20px]">10</p>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <p className="m-0 relative leading-[20px]">11</p>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <p className="m-0 relative leading-[20px]">12</p>
                            </div>
                        </div>
                        <Image width={24} height={24} loading="lazy" 
                            className="absolute top-[21.65px] left-[86.13px] w-[496.86px] h-[193.39px]"
                            alt=""
                            src="/group-1000001353.svg"
                        />
                        <Image width={24} height={24} loading="lazy" 
                            className="absolute top-[34.24px] left-[86.41px] w-[496.57px] h-[181.15px]"
                            alt=""
                            src="/group-1000001355.svg"
                        />
                        <Image width={24} height={24} loading="lazy" 
                            className="absolute top-[165.29px] left-[86.22px] w-[496.41px] h-[49.75px]"
                            alt=""
                            src="/group-1000001354.svg"
                        />
                    </div>
                    <div className="absolute top-[25.5px] left-[597.5px] rounded-[8.91px] bg-midnightblue-100 flex flex-row p-0.5 items-start justify-start gap-[1px] border-[1px] border-solid border-midnightblue-100">
                        <div className="rounded-lg h-7 flex flex-row py-1.5 px-2 box-border items-center justify-center gap-[10px]">
                            <div className="relative rounded-[6.93px] bg-white shadow-[0px_3px_8px_rgba(0,_0,_0,_0.12),_0px_3px_1px_rgba(0,_0,_0,_0.04)] box-border w-[59.78px] h-[29px] shrink-0 hidden border-[0.5px] border-solid border-[rgba(0,]" />
                            <div className="relative leading-[24px] uppercase">All</div>
                            <div className="relative rounded-12xs-5 bg-midnightblue-100 w-[0.34px] h-4 shrink-0 hidden opacity-[0.3] mix-blend-normal" />
                        </div>
                        <div className="rounded-lg bg-midnightblue-200 shadow-[0px_3px_12px_rgba(0,_0,_0,_0.06)] box-border h-[29px] flex flex-row py-1.5 px-2 items-center justify-center gap-[10px] border-[0.5px] border-solid border-[rgba(0,]">
                            <div className="relative leading-[24px] uppercase">Week</div>
                            <div className="relative rounded-12xs-5 bg-midnightblue-100 w-[0.33px] h-4 shrink-0 hidden opacity-[0.3] mix-blend-normal" />
                        </div>
                        <div className="rounded-lg h-7 flex flex-row py-1.5 px-2 box-border items-center justify-center gap-[10px]">
                            <div className="relative leading-[24px] uppercase">Month</div>
                            <div className="relative rounded-[6.93px] bg-white shadow-[0px_3px_8px_rgba(0,_0,_0,_0.12),_0px_3px_1px_rgba(0,_0,_0,_0.04)] box-border w-[59.78px] h-[29px] shrink-0 hidden border-[0.5px] border-solid border-[rgba(0,]" />
                            <div className="relative rounded-12xs-5 bg-midnightblue-100 w-[0.34px] h-4 shrink-0 hidden opacity-[0.3] mix-blend-normal" />
                        </div>
                    </div>
                    <div className="absolute top-[25.5px] left-[795.5px] rounded-[8.91px] bg-midnightblue-100 flex flex-row p-0.5 items-start justify-start border-[1px] border-solid border-midnightblue-100">
                        <div className="rounded-lg h-7 flex flex-row py-1.5 px-2 box-border items-center justify-center gap-[4px]">
                            <div className="relative leading-[24px] uppercase">team</div>
                            <Image width={24} height={24} loading="lazy"  className="relative w-3 h-3 shrink-0" alt="" src="/caretdown.svg" />
                        </div>
                    </div>
                </div> */}
                {/** Section */}
                <div className="flex flex-row my-2 gap-[30px]">
                    {/* <div className="rounded-xl bg-midnightblue-100 w-[588px] h-[380px] overflow-hidden ">
                        <div className="flex flex-row items-center justify-start p-6 gap-[8px]">
                            <div className="rounded bg-midnightblue-200 flex flex-row p-2 items-center justify-center">
                                <Image
                                    width={24}
                                    height={24}
                                    loading="lazy"
                                    className="relative w-5 h-5 shrink-0"
                                    alt=""
                                    src="/users4.svg"
                                />
                            </div>
                            <p className="m-0 relative tracking-[-0.04em] leading-[20px] uppercase">Jurisdiction</p>
                        </div>
                        <div className="box-border w-[541px] h-px opacity-[0.12] border-t-[1px] border-solid border-white" />
                        <Image
                            width={100}
                            height={100}
                            loading="lazy"
                            className="p-2 w-[540.3px] h-[264.3px]"
                            alt=""
                            src="/group-1000001367.svg"
                        />
                    </div> */}
                    {/** Section */}
                    <div className=" rounded-xl bg-blue w-[282px] h-[380px]">
                        <div className="p-6 flex flex-row items-center justify-start gap-[8px]">
                            <div className="rounded bg-slateblue flex flex-row p-2 items-center justify-center">
                                <Image
                                    width={24}
                                    height={24}
                                    loading="lazy"
                                    className="relative w-5 h-5 shrink-0"
                                    alt=""
                                    src="/gamecontroller.svg"
                                />
                            </div>
                            <p className="m-0 relative tracking-[-0.04em] leading-[20px] uppercase">Battles Played</p>
                        </div>
                        <div className="flex flex-col w-[213px] h-[68px] text-13xl">
                            <div className=" flex flex-row items-start justify-start gap-[4px] p-4">
                                <div className="relative tracking-[-0.04em] leading-[40px] uppercase">Played:</div>
                                <div className="relative tracking-[-0.04em] leading-[40px] uppercase">140</div>
                            </div>
                            <div className=" flex flex-row items-center justify-start gap-[13px] text-sm">
                                <p className="m-0 relative tracking-[-0.04em] leading-[35px] uppercase p-4">
                                    Won to date:
                                </p>
                                <div className="flex flex-row items-center justify-start gap-[8px] text-base">
                                    <Image
                                        width={24}
                                        height={24}
                                        loading="lazy"
                                        className="relative w-5 h-5 shrink-0 overflow-hidden"
                                        alt=""
                                        src="/ethereumethlogo-22.svg"
                                    />
                                    <div className="relative leading-[24px] uppercase">576.28</div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-[75.5px] left-[23.5px] box-border w-[235px] h-px opacity-[0.12] border-t-[1px] border-solid border-white" />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;

{
    /**







*/
}
