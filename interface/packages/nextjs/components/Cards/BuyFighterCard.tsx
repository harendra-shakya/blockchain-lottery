import { useState } from "react";
import EthBtn from "../buttons/EthBtn";
import { getParsedEthersError } from "../scaffold-eth";
import axios from "axios";
import { ethers } from "ethers";
import { useAccount, useNetwork } from "wagmi";
import { useDeployedContractInfo, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { getTargetNetwork, notification } from "~~/utils/scaffold-eth";

const BuyFighterCard = ({
    className = "",
    price,
    expectedEntries,
    entries,
    gasSavings,
    battleId,
    priceId,
    collectionAddress = "0x0000000000000000000000000000000000000000",
    collectionTokenIdUsed = 0,
}: {
    className?: string;
    price: string;
    expectedEntries: number;
    entries: number;
    gasSavings: number;
    battleId: number;
    priceId: number;
    collectionAddress?: string;
    collectionTokenIdUsed?: number;
}) => {
    const { address } = useAccount();
    const configuredNetwork = getTargetNetwork();
    const { chain } = useNetwork();

    const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);
    const gasLessEnabled = useGlobalState(state => state.gasLessEnabled);

    const [loading, setLoading] = useState(false);

    const contractName = "ChainWarzLottery";
    const { data: deployedContractData } = useDeployedContractInfo(contractName);

    const args: any = [battleId, priceId, collectionAddress, collectionTokenIdUsed];

    const { writeAsync: buyFighter, isLoading } = useScaffoldContractWrite({
        contractName: "ChainWarzLottery",
        functionName: "buyFighter",
        args: args,
        value: price.toString(),
    });

    const { data: balance }: { data: any } = useScaffoldContractRead({
        contractName: "FundManager",
        functionName: "getBalance",
        args: [address],
    });

    const gaslessEntry = async () => {
        let notificationId: string;

        const insufficientFund = +balance < +ethers.utils.parseEther(price);
        if (insufficientFund) {
            notification.error("Insufficient Funds in Chain Warz Account!");
            return;
        }

        if (priceId == 0) {
            notification.error("Please Select Pack for entries.");
            return;
        }

        try {
            setLoading(true);
            notificationId = notification.loading("Mining Your Transaction!");

            const network = chain?.network;

            const res = await axios.post("/api/gaslessEntry", {
                network,
                deployedContractData,
                battleId,
                amountOfEntries: entries,
                address,
                price,
                nativeCurrencyPrice, // for logging gas price
            });

            console.log("res", res);

            notification.remove(notificationId);

            if (res.status == 200) {
                notification.success("Transaction completed successfully!", {
                    icon: "🎉",
                });
            } else if (res.status == 400) {
                console.log("--------------------------------------");
                console.log(res.data.error);
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
        <div
            className={`rounded-13xl bg-mediumslateblue-300 flex flex-col py-[30px] px-8 items-center justify-start gap-[24px] ${className}`}
        >
            <div className="hidden leading-[24px] uppercase">Most popular</div>
            <div className="flex flex-col items-center justify-start gap-[8px] text-gray">
                <div className="flex flex-row items-end justify-start gap-[6px]">
                    {gasSavings > 1 && (
                        <div className="relative min-w-[50px] h-7">
                            <p className="m-0 leading-[24px] uppercase">{expectedEntries}</p>
                            <div className="absolute top-[10px] left-[14px] box-border w-[21px] h-0.5 border-t-[2px] border-solid border-moderate-pink" />
                        </div>
                    )}

                    <p className="m-0 relative text-21xl tracking-[-0.04em] leading-[48px] uppercase text-cyan">
                        {entries}
                    </p>
                </div>
                <div className="relative leading-[24px] uppercase text-white text-center">entries</div>
            </div>
            <div className={`${className}`}>
                <EthBtn
                    imgName="/icons/eth/ethGradient.svg"
                    name={price.toString()}
                    callback={() => {
                        if (gasLessEnabled) {
                            gaslessEntry();
                        } else {
                            buyFighter();
                        }
                    }}
                    loading={isLoading || loading}
                    disabled={chain?.id !== configuredNetwork.id}
                />
            </div>
            <div className="flex flex-col items-center justify-start gap-[8px] text-center text-xs">
                {gasSavings > 1 && (
                    <>
                        <div className="relative leading-[24px] uppercase">
                            {`Includes ${entries - expectedEntries} free entries`}
                        </div>
                        <div className="relative leading-[24px] uppercase text-blue text-left">
                            {`Bundle Saving = ${gasSavings}x`}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BuyFighterCard;
