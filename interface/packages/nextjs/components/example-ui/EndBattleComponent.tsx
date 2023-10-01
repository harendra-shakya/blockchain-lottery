import { FC } from "react";
import { useState } from "react";
import { getParsedEthersError } from "../scaffold-eth";
import axios from "axios";
// import { useAccount } from "wagmi";
import { useNetwork } from "wagmi";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
// import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { notification } from "~~/utils/scaffold-eth";

interface IEndBattleComponent {
    battleId: number;
}

const EndBattleComponent: FC<IEndBattleComponent> = ({ battleId }) => {
    // const { address } = useAccount();
    const [loading, setLoading] = useState(false);
    const { chain } = useNetwork();
    const contractName = "ChainWarzLottery";

    const { data: deployedContractData } = useDeployedContractInfo(contractName);
    const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);

    // const args: any = [battleId];

    // const { writeAsync, isLoading } = useScaffoldContractWrite({
    //     contractName: "ChainWarzLottery",
    //     functionName: "endBattle",
    //     args: args,
    //     onBlockConfirmation: txnReceipt => {
    //         console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    //     },
    // });
    // const { data: operator } = useScaffoldContractRead({
    //     contractName: "ChainWarzLottery",
    //     functionName: "operatorAddress",
    // });

    const endBattle = async () => {
        let notificationId: string;

        try {
            setLoading(true);
            notificationId = notification.loading("Mining Your Transaction!");

            const network = chain?.network;

            const res = await axios.post("/api/endBattle", {
                network,
                deployedContractData,
                nativeCurrencyPrice,
                // args
                battleId,
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
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <div className="flex flex-col items-center justify-center">
                <input
                    type="text"
                    placeholder="battleId"
                    className="input font-bai-jamjuree w-full px-5 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
                    value={`Battle #${battleId}`}
                    disabled
                />
            </div>

            <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
                <div className="flex rounded-full border-2 border-primary p-1">
                    <button
                        className={`btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
                            loading ? "loading" : ""
                        }`}
                        onClick={() => {
                            // if (operator != address) {
                            //     notification.error("You're not Operator");
                            //     return;
                            // }
                            // writeAsync();
                            endBattle();
                        }}
                    >
                        {!loading && (
                            <>
                                End <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EndBattleComponent;
