import React from "react";
import BuyFighterCard from "../Cards/BuyFighterCard";
import { Meta } from "../Meta";
import { formatEther } from "../scaffold-eth";
import LiveChat from "./LiveChat";
import Participants from "./Participants";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

interface IBattle {
    battleId: string;
}

const Battle: NextPage<IBattle> = ({ battleId }) => {
    const { address } = useAccount();

    // @ts-expect-error
    const { data: prices }: { data: PriceStructure[] } = useScaffoldContractRead({
        contractName: "ChainWarzLottery",
        functionName: "getPrices",
        // @ts-expect-error
        args: [battleId],
    });

    // @ts-expect-error
    const { data: battle }: { data: BattleStruct } = useScaffoldContractRead({
        contractName: "ChainWarzLottery",
        functionName: "getBattle",
        // @ts-expect-error
        args: [battleId],
    });

    // @ts-expect-error
    const { data: claimData }: { data: ClaimData } = useScaffoldContractRead({
        contractName: "ChainWarzLottery",
        functionName: "getClaimData",
        // @ts-expect-error
        args: [battleId, address],
    });

    const bestValuePriceId = 4;

    return (
        <>
            <Meta title={"Battle"} description={"Battle"} imageUrl="https://chainwarz.io/chainwarzMetaLogo.jpg" />
            <div className="flex flex-col text-center justify-center items-center w-full h-full text-white font-orbitron mx-auto gap-8 2xl:scale-[1] scale-[.90]">
                <h1 className="mt-40 default-text-77xl leading-[104px] uppercase h-shadow">COMPETITION</h1>
                {/* 1 */}
                <div className="flex lg:flex-row flex-col mx-auto gap-8">
                    <div className="p-[10px] rounded-3xl primary-gradient-tr  flex flex-col items-center justify-center text-center  text-black ">
                        <div className="m-0 mx-auto w-full h-full rounded-3xl  font-digital-7-mono bg-black  text-white">
                            <p className="my-0 p-4 default-text-100xl">12:54:15</p>
                        </div>
                    </div>

                    <div className="rounded-13xl primary-gradient-tr md:w-[690px] md:h-[185px] flex flex-row p-10 box-border items-center justify-center ">
                        {/* <img className="-mt-40 w-[82px] h-[86px] object-cover" alt="" src="/star1@2x.png" /> */}
                        {/* <img className="mt-44 ml-10 w-[47.22px] h-[58.25px] object-cover" alt="" src="/star2@2x.png" /> */}
                        <div className="flex flex-col items-center justify-start gap-[16px] z-[0]">
                            <div className=" leading-[24px] uppercase text-base">Prize pool</div>
                            <div className="flex flex-row items-start justify-start gap-[8px] default-text-53xl">
                                <img className=" w-16 h-16" alt="" src="/icons/eth/ethWhite.svg" />
                                <div className=" leading-[80px] uppercase">
                                    {battle ? formatEther(String(battle?.amountCollected)) : "0"}
                                </div>
                            </div>
                        </div>

                        {/* <img className=" ml-28 w-[70px] h-[63px] object-cover" alt="" src="/star3@2x.png" /> */}
                    </div>
                </div>
                {/* 2 */}
                <div className="flex lg:flex-row flex-col mx-auto gap-8">
                    <div className="rounded-13xl bg-mediumslateblue-300 md:w-[486px] flex flex-col py-6 px-10 box-border mx-auto items-center justify-center gap-[16px] text-left default-text-13xl text-white">
                        <div className="flex flex-col items-center justify-center">
                            <div className=" leading-[40px] uppercase">Want a free entry?</div>
                            <div className=" text-xs leading-[24px] uppercase">Share this battle</div>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-[12px]">
                            <div className="cursor-pointer rounded-xl bg-white flex flex-row p-4 items-center justify-center">
                                <img className=" w-6 h-6" alt="" src="/icons/twitter/twitterLogo.svg" />
                            </div>
                            <div className="cursor-pointer rounded-xl bg-white flex flex-row p-4 items-center justify-center">
                                <img className=" w-6 h-6" alt="" src="/icons/discord/discordLogo.svg" />
                            </div>
                            <div className="cursor-pointer rounded-xl bg-white flex flex-row p-4 items-center justify-center">
                                <img className=" w-6 h-6" alt="" src="/icons/share.svg" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-13xl bg-mediumslateblue-300 md:w-[690px] md:h-[185px] flex flex-row p-10 box-border items-center justify-center">
                        <div className="flex flex-row items-center justify-center gap-[64px]">
                            <div className="flex flex-col items-center justify-center gap-[16px]">
                                <div className="leading-[24px] uppercase">You BOUGHT</div>
                                <div className="text-29xl tracking-[-0.04em] leading-[56px] uppercase">
                                    {claimData ? +claimData?.numEntriesPerUser : 0}
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center gap-[16px]">
                                <div className="leading-[24px] uppercase">Total fighters</div>
                                <div className="text-29xl tracking-[-0.04em] leading-[56px] uppercase text-gray">
                                    {battle ? +battle?.entriesLength : 0}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 3 */}
                <div className="flex lg:flex-row flex-col mx-auto gap-8">
                    <div className="flex flex-col mx-auto gap-8">
                        <Participants battleId={+battleId} />
                        <LiveChat userLocation={battleId} />
                    </div>

                    {/* Enter battle start */}
                    <div className="rounded-13xl bg-mediumslateblue-300 md:w-[690px] flex flex-col p-10 box-border items-center justify-center gap-[24px]">
                        <p className="m-0 relative text-13xl tracking-[-0.04em] leading-[40px] uppercase">
                            Enter Battle
                        </p>

                        <div className="flex flex-col items-center justify-start">
                            <div className="self-stretch rounded-t-13xl rounded-b-none [background:conic-gradient(from_65.05deg_at_50%_50%,_#22def1_0deg,_#ff817d_138.75deg,_#8233ff_285deg,_#3857fd_318.75deg,_#22def1_360deg,_#ff817d_498.75deg)] flex flex-col py-2 px-8 items-center justify-start">
                                <div className="flex flex-row items-end justify-start">
                                    <div className="relative leading-[24px] uppercase">Best Value</div>
                                </div>
                            </div>

                            <BuyFighterCard
                                className="rounded-t-none self-stretch md:w-[561px] "
                                price={prices ? formatEther(String(prices[bestValuePriceId].price)) : "0"}
                                expectedEntries={
                                    prices
                                        ? +prices[0].numEntries *
                                          parseInt(String(+prices[bestValuePriceId].price / +prices[0].price))
                                        : 0
                                }
                                gasSavings={
                                    prices
                                        ? parseInt(String(+prices[bestValuePriceId].numEntries / +prices[0].numEntries))
                                        : 0
                                }
                                entries={prices ? +prices[bestValuePriceId].numEntries : 0}
                                battleId={+battleId}
                                priceId={prices ? +prices[bestValuePriceId].id : 0}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 grid-cols-1 justify-center items-center gap-[24px]">
                            {prices?.map((priceStruct, i) => (
                                <BuyFighterCard
                                    price={formatEther(String(priceStruct.price))}
                                    expectedEntries={
                                        prices
                                            ? +prices[0].numEntries *
                                              parseInt(String(+priceStruct.price / +prices[0].price))
                                            : 0
                                    }
                                    gasSavings={
                                        prices ? parseInt(String(+priceStruct.numEntries / +prices[0].numEntries)) : 0
                                    }
                                    entries={+priceStruct.numEntries}
                                    battleId={+battleId}
                                    priceId={+priceStruct.id}
                                    key={`buyFighter-${i}`}
                                />
                            ))}
                        </div>

                        <div className="hidden flex-col items-center justify-start gap-[8px] text-center text-xs text-blue">
                            <div className="relative leading-[24px] uppercase">All entries require gas.</div>
                            <div className="relative leading-[24px] uppercase text-left">
                                <span className="text-white">Multi Buy Gas Amount = Single Entry Gas Amount</span>
                            </div>
                        </div>
                    </div>
                    {/* Enter battle end */}
                </div>
            </div>
        </>
    );
};

export default Battle;
