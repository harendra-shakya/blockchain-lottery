import React from "react";
import Image from "next/image";
import BattleCard from "../Cards/BattleCard";
import { Meta } from "../Meta";
import { formatEther } from "../scaffold-eth";
import LiveChat from "./LiveChat";
import Participants from "./Participants";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import { ShareIcon } from "@heroicons/react/24/solid";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import truncateAddress from "~~/lib/Truncate/truncateAddress";
import { Status } from "~~/types/enums";

interface IBattle {
    battleId: string;
}

const BattleEnded: NextPage<IBattle> = ({ battleId }) => {
    const { address } = useAccount();

    //@ts-expect-error
    const { data: battles }: { data: BattleStruct[] } = useScaffoldContractRead({
        contractName: "ChainWarzLottery",
        functionName: "getBattles",
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

    return (
        <>
            <Meta
                title={"Battle Ended"}
                description={"Battle Ended"}
                imageUrl="https://chainwarz.io/chainwarzMetaLogo.jpg"
            />
            <div className="flex flex-col text-center justify-center items-center w-full h-full text-white font-orbitron mx-auto gap-8 2xl:scale-[1] scale-[.90]">
                <h1 className="mt-40 default-text-77xl leading-[104px] uppercase h-shadow">END OF BATTLE</h1>
                {/* 1 */}
                <div className="flex lg:flex-row flex-col mx-auto gap-8">
                    <div className="rounded-13xl primary-gradient-tr md:w-[486px] w-full flex flex-col py-10 px-11 box-border items-start justify-center gap-[24px] text-29xl">
                        <div className="self-stretch flex flex-row items-start justify-between">
                            <div className="flex flex-col items-start justify-start gap-[24px]">
                                <div className="relative tracking-[-0.04em] leading-[56px] uppercase">Winner</div>
                                <div className="flex flex-row items-center justify-start text-5xl">
                                    <div className="flex flex-row items-center justify-start gap-[24px]">
                                        <img
                                            className="relative rounded-21xl w-20 h-20 overflow-hidden shrink-0 object-cover"
                                            alt=""
                                            src="/icons/defaultPic.png"
                                        />
                                        <div className="flex flex-col items-start justify-start gap-[8px]">
                                            <div className="relative tracking-[-0.04em] leading-[32px] uppercase">
                                                embfort
                                            </div>
                                            <div className="flex flex-row items-center justify-end gap-[8px] opacity-[0.75] text-base">
                                                <div className="relative leading-[24px] uppercase">3 hours ago</div>
                                                <ShareIcon className="w-6" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img
                                className="relative w-[76px] h-[76px] object-cover"
                                alt=""
                                src="/icons/victorycup.png"
                            />
                        </div>
                        <div className="flex flex-row items-center justify-start opacity-[0.75] text-base">
                            <div className="flex flex-col items-start justify-center">
                                <div className="flex flex-col items-center justify-start gap-[8px]">
                                    <div className="relative leading-[24px] uppercase">
                                        Battle Hash: cb784....w5trxdg
                                    </div>
                                    <div className="relative leading-[24px] uppercase">
                                        Winner: {battle && truncateAddress(battle.winner)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-13xl bg-mediumslateblue-300  w-full md:w-[690px] md:h-[185px] flex flex-row p-10 box-border items-start justify-between text-base">
                        <div className="flex flex-col items-start justify-start gap-[8px]">
                            <div className="leading-[24px] uppercase">Prize pool</div>
                            <div className="flex flex-row items-start justify-start gap-[8px] text-cyan">
                                <Image
                                    width={24}
                                    height={24}
                                    loading="lazy"
                                    className="w-8 h-12"
                                    alt=""
                                    src={`/icons/eth/ethGradient.svg`}
                                />
                                <div className="tracking-[-0.04em] leading-[56px] uppercase md:default-text-29xl text-7xl">
                                    {battle ? formatEther(String(battle?.amountCollected)) : "0"}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-start justify-start gap-[64px] text-xs">
                            <div className="flex flex-col items-end justify-start">
                                <div className="leading-[24px] uppercase">YOUR FIGHTERS</div>
                                <div className="default-text-13xl tracking-[-0.04em] leading-[40px] uppercase">
                                    {claimData ? +claimData?.numEntriesPerUser : 0}
                                </div>
                            </div>
                            <div className="flex flex-col items-end justify-start">
                                <div className="leading-[24px] uppercase">Total fighters</div>
                                <div className="default-text-13xl tracking-[-0.04em] leading-[40px] uppercase text-gray">
                                    {+battle?.entriesLength}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3 */}
                <div className="flex lg:flex-row flex-col mx-auto gap-8">
                    <div className="flex flex-col mx-auto gap-8">
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
                        <Participants />
                        <LiveChat userLocation={String(battleId)} />
                    </div>

                    {/* Enter battle start */}
                    <div className="rounded-13xl bg-mediumslateblue-300 w-full h-full md:w-[690px] flex flex-col p-10 box-border items-center justify-center gap-[24px]">
                        <p className="m-0 relative text-13xl tracking-[-0.04em] leading-[40px] uppercase">
                            UPCOMING BATTLES
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            {battles?.map(
                                (battle, index) =>
                                    battle.status == Status.Open && (
                                        <BattleCard
                                            battleId={index}
                                            prize={`${formatEther(String(battle.amountCollected))}`}
                                            timeLeft="02.04.03"
                                        />
                                    ),
                            )}
                        </div>
                    </div>
                    {/* Enter battle end */}
                </div>
            </div>
        </>
    );
};

export default BattleEnded;
