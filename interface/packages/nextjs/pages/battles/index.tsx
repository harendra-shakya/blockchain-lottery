import { useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import BattleCard from "~~/components/Cards/BattleCard";
import MainLayout from "~~/components/layouts/MainLayout";
import { formatEther } from "~~/components/scaffold-eth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { Status } from "~~/types/enums";

const Battles: NextPage = () => {
    const [showJackpotBattles, setShowJackpotBattles] = useState(false);

    //@ts-expect-error
    const { data: battles }: { data: BattleStruct[] } = useScaffoldContractRead({
        contractName: "ChainWarzLottery",
        functionName: "getBattles",
    });

    return (
        <MainLayout>
            <div className="flex flex-col items-center justify-start gap-[72px] z-[0] my-40 lg:mx-28 mx-10">
                <h1 className="m-0 default-text-77xl text-white relative tracking-[-0.04em] leading-[104px] uppercase [text-shadow:0px_0px_64px_#5fb2ff] [-webkit-text-stroke:1px_#35d2e2]">
                    Battles
                </h1>

                <div className="flex flex-col lg:items-start items-center justify-center w-full gap-[32px] text-left text-5xl ">
                    <div className="w-full">
                        <div className="flex md:flex-row flex-col justify-between mx-auto gap-[32px] ">
                            <div className="flex flex-col">
                                <div className="flex flex-row items-start justify-start gap-[64px]">
                                    <p
                                        className={`m-0  leading-[32px] uppercase cursor-pointer ${
                                            showJackpotBattles ? "text-white" : "text-blue"
                                        }`}
                                        onClick={() => {
                                            setShowJackpotBattles(false);
                                        }}
                                    >
                                        Upcoming Battles
                                    </p>
                                    <p
                                        className={`m-0  leading-[32px] uppercase  cursor-pointer ${
                                            showJackpotBattles ? "text-blue" : "text-white"
                                        }`}
                                        onClick={() => {
                                            setShowJackpotBattles(true);
                                        }}
                                    >
                                        JACKPOT
                                    </p>
                                </div>
                                <div className="flex flex-row">
                                    {!showJackpotBattles ? (
                                        <>
                                            <div className=" rounded-t-8xs rounded-b-none bg-blue w-[177px] h-[5px]" />
                                            <div className=" rounded-t-8xs rounded-b-none bg-blue w-[296px] h-[5px] opacity-[0.2]" />
                                        </>
                                    ) : (
                                        <>
                                            <div className=" rounded-t-8xs rounded-b-none bg-blue w-[296px] h-[5px] opacity-[0.2]" />
                                            <div className=" rounded-t-8xs rounded-b-none bg-blue w-[177px] h-[5px]" />
                                        </>
                                    )}
                                </div>
                            </div>

                            <button className="cursor-pointer [border:none] py-4 px-6 rounded-3xl primary-gradient-tr btn-shadow   gap-[12px] justify-center items-center flex flex-row">
                                <Image
                                    src="/icons/victorycup.png"
                                    alt="Victory Cup"
                                    width={24}
                                    height={24}
                                    loading="lazy"
                                />
                                <div className=" text-xs leading-[24px] uppercase font-orbitron text-white text-left">
                                    Winners
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="grid 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-start justify-start gap-[24px] text-xs text-white">
                        {!showJackpotBattles ? (
                            <>
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
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Battles;
