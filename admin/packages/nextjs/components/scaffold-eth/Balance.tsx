import { ethers } from "ethers";
import { useAccountBalance, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

type TBalanceProps = {
    address?: string;
    gasLessEnabled?: boolean;
    className?: string;
};

/**
 * Display (ETH & USD) balance of an ETH address.
 */
export const Balance = ({ address, gasLessEnabled, className = "" }: TBalanceProps) => {
    const configuredNetwork = getTargetNetwork();
    const { balance, price, isError, isLoading, onToggleBalance, isEthBalance } = useAccountBalance(address);

    const { data: cwBalance }: { data: any } = useScaffoldContractRead({
        contractName: "FundManager",
        functionName: "getBalance",
        args: [address],
    });

    if (!address || isLoading || balance === null) {
        return (
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-md bg-slate-300 h-6 w-6"></div>
                <div className="flex items-center space-y-6">
                    <div className="h-2 w-28 bg-slate-300 rounded"></div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div
                className={`border-2 border-gray-400 rounded-md px-2 flex flex-col items-center max-w-fit cursor-pointer`}
            >
                <div className="text-warning">Error</div>
            </div>
        );
    }

    return (
        <button
            className={`btn btn-sm btn-ghost flex flex-col font-normal items-center hover:bg-transparent ${className}`}
            onClick={onToggleBalance}
        >
            <div className={`w-full flex items-center justify-center`}>
                {isEthBalance ? (
                    <>
                        {!gasLessEnabled ? (
                            <span className="text-gradient-tr leading-[10px]">{balance?.toFixed(4)}</span>
                        ) : (
                            <span className="text-gradient-tr leading-[10px]">
                                {cwBalance && (+ethers.utils.formatEther(cwBalance)).toFixed(4)}
                            </span>
                        )}

                        <span className="text-[0.8em] text-gradient-tr leading-[10px] font-bold ml-1">
                            {configuredNetwork.nativeCurrency.symbol}
                        </span>
                    </>
                ) : (
                    <>
                        <span className="text-[0.8em] text-gradient-tr leading-[10px] font-bold mr-1">$</span>
                        {!gasLessEnabled ? (
                            <span className="text-gradient-tr leading-[10px]">{(balance * price).toFixed(2)}</span>
                        ) : (
                            <span className="text-gradient-tr leading-[10px]">
                                {cwBalance && (+ethers.utils.formatEther(cwBalance) * price).toFixed(2)}
                            </span>
                        )}
                    </>
                )}
            </div>
        </button>
    );
};
