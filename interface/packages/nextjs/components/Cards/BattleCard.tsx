import React from "react";
import Link from "next/link";
import { ethers } from "ethers";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

interface IBattleCard {
    battleId: number;
    prize: string;
    timeLeft: string;
}

export default function BattleCard({ battleId, prize, timeLeft }: IBattleCard) {
    // @ts-expect-error
    const { data: prices }: { data: PriceStructure[] } = useScaffoldContractRead({
        contractName: "ChainWarzLottery",
        functionName: "getPrices",
        // @ts-expect-error
        args: [battleId],
    });

    return (
        <div className="rounded-2xl bg-black flex flex-col pt-0 px-0 pb-6 items-center justify-center gap-[24px] border-[1px] border-solid border-gray">
            {/** Image */}
            <div className="relative w-[282px] h-[213px] shrink-0 bg-moderate-pink rounded-xl">
                <div className="absolute top-[16px] left-[16px] rounded-lg bg-gray flex flex-row pt-0.5 px-2 pb-0 items-start justify-start">
                    <p className="m-0 relative leading-[24px] uppercase">#{battleId}</p>
                </div>
                <img className="w-[338px] h-[190px] object-cover" alt="" src="/images/bots/battleDefaultBot.png" />
            </div>

            {/** Price and Prize */}
            <div className="flex flex-col items-center justify-start gap-[16px]">
                <div className="w-[196px] flex flex-row items-center justify-between text-blue">
                    <div className="flex flex-col items-start justify-start">
                        <p className="m-0 relative leading-[16px] uppercase">Entry</p>
                        <div className="relative leading-[16px] uppercase">Price</div>
                    </div>
                    <div className="flex flex-row items-start justify-start text-13xl text-white">
                        <img
                            className="relative w-10 h-10 shrink-0 overflow-hidden"
                            alt=""
                            src="/icons/eth/ethWhite.svg"
                        />
                        <p className="m-0 relative tracking-[-0.04em] leading-[40px] uppercase">
                            {prices && (+ethers.utils.formatEther(prices[0].price)).toFixed(3)}
                        </p>
                    </div>
                </div>

                <div className="rounded-xl [background:linear-gradient(48.73deg,_#ff817d,_#8233ff_46.35%,_#3857fd_63.02%,_#22def1)] w-[228px] flex flex-row p-4 box-border items-center justify-between">
                    <div className="flex flex-col items-start justify-start">
                        <div className="relative leading-[16px] uppercase">Prize</div>
                        <div className="relative leading-[16px] uppercase">pool</div>
                    </div>
                    <div className="flex flex-row items-start justify-start text-13xl">
                        <img
                            className="relative w-10 h-10 shrink-0 overflow-hidden"
                            alt=""
                            src="/icons/eth/ethWhite.svg"
                        />
                        <div className="relative tracking-[-0.04em] leading-[40px] uppercase">
                            {(+prize).toFixed(3)}
                        </div>
                    </div>
                </div>
            </div>

            {/** Enter now btn */}

            <Link href={`/battles/${battleId}`}>
                <button className="[border:none] py-[21px] px-12 cw-btn">
                    <div className="relative text-5xl text-gradient-tr">Enter now</div>
                </button>
            </Link>

            {/** Timer */}
            <div className="p-[1px] rounded-xl primary-gradient-tr  flex flex-col items-center justify-center text-center text-[56.33px] text-black ">
                <div className="m-0 mx-auto w-full h-full rounded-xl  font-digital-7-mono bg-black  text-white">
                    <p className="my-0 p-4">{timeLeft}</p>
                </div>
            </div>
            <p className="m-0 relative leading-[24px] uppercase text-blue">Closes Today</p>
        </div>
    );
}
