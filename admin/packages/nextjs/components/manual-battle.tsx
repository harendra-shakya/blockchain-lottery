import { useState } from "react";
import React from "react";
import Button from "./buttons/Button";
import { getParsedEthersError } from "./scaffold-eth";
import axios from "axios";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { notification } from "~~/utils/scaffold-eth";

const ManualBattle: NextPage = () => {
    const [maxEntries, setMaxEntries] = useState(0);

    const treasuryFeeInBps = 500;
    const weeklyJackpotBattleBps = 500;
    // const [treasuryFeeInBps, setTreasuryFeeInBps] = useState(500);
    // const [weeklyJackpotBattleBps, setWeeklyJackpotBattleBps] = useState(500);
    const nftCollectionWhitelist: string[] = [];
    const [IsJackpotBattle, setIsJackpotBattle] = useState(false);

    const [loading, setLoading] = useState(false);
    const contractName = "ChainWarzLottery";
    const { data: deployedContractData } = useDeployedContractInfo(contractName);
    const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);
    const [priceData, setPriceData] = useState<PriceStructure[]>([
        {
            id: 1,
            numEntries: 0,
            price: 0,
        },
        {
            id: 2,
            numEntries: 0,
            price: 0,
        },
        {
            id: 3,
            numEntries: 0,
            price: 0,
        },
        {
            id: 4,
            numEntries: 0,
            price: 0,
        },
        {
            id: 5,
            numEntries: 0,
            price: 0,
        },
    ]);

    // const { data: operator } = useScaffoldContractRead({
    //     contractName: "ChainWarzLottery",
    //     functionName: "operatorAddress",
    // });

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>, priceId: string) => {
        updatePriceData(priceId, "price", ethers.utils.parseEther(event.target.value));
    };

    const handleEntriesChange = (event: React.ChangeEvent<HTMLInputElement>, priceId: string) => {
        const value = parseInt(event.target.value, 10);
        updatePriceData(priceId, "numEntries", value);
    };

    const updatePriceData = (id: string, field: "price" | "numEntries", value: number | BigNumber) => {
        setPriceData(prevData => {
            const updatedData = prevData.map(item => {
                if (item.id === Number(id)) {
                    return {
                        ...item,
                        [field]: value,
                    };
                }
                return item;
            });
            return updatedData;
        });
    };

    const startBattle = async () => {
        let notificationId: string;

        for (let i = 0; i < priceData.length; i++) {
            const { numEntries, price } = priceData[i];

            if (!(price && numEntries)) {
                notification.error("Price Data is undefined.");
                return;
            }
        }

        try {
            setLoading(true);
            notificationId = notification.loading("Mining Your Transaction!");

            const network = "goerli";

            const res = await axios.post("/api/startBattle", {
                network,
                deployedContractData,
                nativeCurrencyPrice,
                // args
                maxEntries,
                prices: priceData,
                treasuryFeeInBps,
                weeklyJackpotBattleBps,
                nftCollectionWhitelist,
                IsJackpotBattle,
            });

            notification.remove(notificationId);

            if (res.status == 200) {
                notification.success("Transaction completed successfully!", {
                    icon: "🎉",
                });
            } else if (res.status == 400) {
                notification.error(`${res.data.error}`);
            } else {
                notification.error("Tx Failed. Server Error");
            }
        } catch (e) {
            notification.error(`${getParsedEthersError(e)}`);
        } finally {
            notification.remove(notificationId!);
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto mb-10 flex flex-col items-start justify-start rounded-xl bg-midnightblue-100 w-full h-full overflow-hidden text-left text-xs text-white font-orbitron">
            <div className="ml-10 my-10">
                <div className="flex flex-row justify-between mx-4 my-2 text-21xl">
                    <div className=" top-[0px] left-[0px] tracking-[-0.04em] leading-[48px] uppercase">MANUAL</div>

                    <Button
                        text="Create"
                        className="lg:mx-0 py-1 px-4 text-base leading-[24px]"
                        onClick={startBattle}
                        loading={loading}
                    />
                </div>

                <div className="my-5 box-border w-[847px] h-px opacity-[0.12] border-t-[1px] border-solid border-white" />

                <div className="mt-10 flex flex-col items-start justify-start gap-[24px]">
                    <div className="flex flex-row items-start justify-start gap-[24px]">
                        <div className="flex flex-col items-start justify-start gap-[4px]">
                            <div className="relative leading-[24px] uppercase">Name</div>
                            <input
                                className="font-orbitron text-white text-base bg-[transparent] rounded-lg box-border w-[258px] flex flex-row p-4 items-center justify-start border-[1px] border-solid border-gray"
                                type="text"
                                placeholder="Nema"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-[4px]">
                            <div className="relative leading-[24px] uppercase">ticket price</div>
                            <input
                                className="font-orbitron text-white text-base bg-[transparent] rounded-lg box-border w-[258px] flex flex-row p-4 items-center justify-start border-[1px] border-solid border-gray"
                                type="text"
                                placeholder="12.545"
                            />
                        </div>
                    </div>

                    {/** Input Start*/}

                    {Array(5)
                        .fill("nothing")
                        .map((_, index) => (
                            <div className="relative w-[410px] h-28" key={index}>
                                <div className="top-[0px] left-[0px] leading-[24px] uppercase">Bundle {index + 1}</div>
                                <div className="top-[28px] left-[0px] flex flex-row items-end justify-start gap-[12px]">
                                    <div className="flex flex-col items-start justify-start gap-[4px]">
                                        <div className="relative leading-[24px] uppercase">Price</div>
                                        <input
                                            className="font-orbitron text-white text-base bg-[transparent] rounded-lg box-border w-[165px] flex flex-row p-4 items-center justify-start border-[1px] border-solid border-gray"
                                            type="number"
                                            placeholder="0.08 ETH"
                                            onChange={e => handlePriceChange(e, (index + 1).toString())}
                                        />
                                    </div>
                                    <div className="flex flex-col items-start justify-start gap-[4px]">
                                        <div className="relative leading-[24px] uppercase">Entries</div>
                                        <input
                                            className="font-orbitron text-white text-base bg-[transparent] rounded-lg box-border w-[165px] flex flex-row p-4 items-center justify-start border-[1px] border-solid border-gray"
                                            type="number"
                                            placeholder="Entries 40"
                                            onChange={e => handleEntriesChange(e, (index + 1).toString())}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    {/** Input End*/}

                    <div className="flex flex-col items-start justify-start gap-[4px]">
                        <div className="relative leading-[24px] uppercase">Max Entries</div>
                        <div className="relative leading-[24px] text-[0.7rem]">(Optional)</div>

                        <input
                            className="font-orbitron text-white text-base bg-[transparent] rounded-lg box-border w-[165px] flex flex-row p-4 items-center justify-start border-[1px] border-solid border-gray"
                            type="number"
                            placeholder="1000"
                            onChange={e => setMaxEntries(+e.target.value)}
                        />
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <p className="text-xl">Jackpot Battle</p>
                        <input
                            type="checkbox"
                            className="toggle toggle-success"
                            checked={IsJackpotBattle}
                            onChange={() => setIsJackpotBattle(!IsJackpotBattle)}
                        />
                    </div>
                </div>

                {/* <div className="flex flex-row items-center justify-start gap-[16px]">
                    <div className="rounded-lg bg-lilac w-14 flex flex-row p-4 box-border items-center justify-start">
                        <img className="relative w-6 h-6" alt="" src="/plus.svg" />
                    </div>
                    <div className="relative leading-[24px] uppercase">add Bundle</div>
                </div> */}

                <div className="mt-10">
                    <p className="m-0  top-[0px] left-[0px] leading-[24px] uppercase">Battle image</p>
                    <input className=" cursor-pointer rounded-xl bg-midnightblue-500 w-[213px] h-[213px]" type="file" />
                    <button className="cursor-pointer py-3 px-4 bg-[transparent]  top-[262px] left-[0px] rounded-xl box-border w-[213px] overflow-hidden flex flex-row items-center justify-center gap-[10px] border-[1px] border-solid border-lightsteelblue-300">
                        <div className="relative w-6 h-6">
                            <img
                                className=" h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
                                alt=""
                                src="/pictureinpicture.svg"
                            />
                        </div>
                        <div className="relative text-base leading-[24px] uppercase font-orbitron text-white text-center">
                            UPLOAD image
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManualBattle;
