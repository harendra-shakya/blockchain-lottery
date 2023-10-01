import { useMemo, useState } from "react";
import { Abi } from "abitype";
import { useContract, useProvider } from "wagmi";
import { Spinner } from "~~/components/Spinner";
import {
    Address,
    Balance,
    getAllContractFunctions,
    getContractReadOnlyMethodsWithParams,
    getContractVariablesAndNoParamsReadMethods,
    getContractWriteMethods,
} from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useNetworkColor } from "~~/hooks/scaffold-eth";
import { getTargetNetwork } from "~~/utils/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";

type ContractUIProps = {
    contractName: ContractName;
    className?: string;
};

/**
 * UI component to interface with deployed contracts.
 **/
export const ContractUI = ({ contractName, className = "" }: ContractUIProps) => {
    const provider = useProvider();
    const [refreshDisplayVariables, setRefreshDisplayVariables] = useState(false);
    const configuredNetwork = getTargetNetwork();

    const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo(contractName);
    const networkColor = useNetworkColor();

    const contract = useContract({
        address: deployedContractData?.address,
        abi: deployedContractData?.abi as Abi,
        signerOrProvider: provider,
    });

    const displayedContractFunctions = useMemo(() => getAllContractFunctions(contract), [contract]);

    const contractVariablesDisplay = useMemo(() => {
        return getContractVariablesAndNoParamsReadMethods(
            contract,
            displayedContractFunctions,
            refreshDisplayVariables,
        );
    }, [contract, displayedContractFunctions, refreshDisplayVariables]);

    const contractMethodsDisplay = useMemo(
        () => getContractReadOnlyMethodsWithParams(contract, displayedContractFunctions),
        [contract, displayedContractFunctions],
    );
    const contractWriteMethods = useMemo(
        () => getContractWriteMethods(contract, displayedContractFunctions, setRefreshDisplayVariables),
        [contract, displayedContractFunctions],
    );

    if (deployedContractLoading) {
        return (
            <div className="mt-14">
                <Spinner width="50px" height="50px" />
            </div>
        );
    }

    if (!deployedContractData) {
        return (
            <p className="text-3xl mt-14">
                {`No contract found by the name of "${contractName}" on chain "${configuredNetwork.name}"!`}
            </p>
        );
    }

    return (
        <div className={`grid grid-cols-1 lg:grid-cols-6 px-6 lg:px-10 lg:gap-12 w-full max-w-7xl my-0 ${className}`}>
            <div className="col-span-5 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                <div className="col-span-1 flex flex-col">
                    <div className="bg-[#385183] border-[#212638] border shadow-md shadow-secondary rounded-3xl px-6 lg:px-8 mb-6 space-y-1 py-4">
                        <div className="flex">
                            <div className="flex flex-col gap-1">
                                <span className="font-bold">{contractName}</span>
                                <Address address={deployedContractData.address} />
                                <div className="flex gap-1 items-center">
                                    <span className="font-bold text-sm">Balance:</span>
                                    <Balance
                                        address={deployedContractData.address}
                                        className="px-0 h-1.5 min-h-[0.375rem]"
                                    />
                                </div>
                            </div>
                        </div>
                        {configuredNetwork && (
                            <p className="my-0 text-sm">
                                <span className="font-bold">Network</span>:{" "}
                                <span style={{ color: networkColor }}>{configuredNetwork.name}</span>
                            </p>
                        )}
                    </div>
                    <div className="bg-[#212638] rounded-3xl px-6 lg:px-8 py-4 shadow-lg shadow-[#212638]">
                        {contractVariablesDisplay.methods.length > 0
                            ? contractVariablesDisplay.methods
                            : "No contract variables"}
                    </div>
                </div>
                <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
                    <div className="z-10">
                        <div className="bg-[#385183] rounded-3xl shadow-md shadow-secondary border border-[#212638] flex flex-col mt-10 relative">
                            <div className="h-[5rem] w-[5.5rem] bg-[#212638] absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 py-[0.65rem] shadow-lg shadow-[#212638]">
                                <div className="flex items-center justify-center space-x-2">
                                    <p className="my-0 text-sm">Read</p>
                                </div>
                            </div>
                            <div className="p-5 divide-y divide-[#212638]">
                                {contractMethodsDisplay.methods.length > 0
                                    ? contractMethodsDisplay.methods
                                    : "No read methods"}
                            </div>
                        </div>
                    </div>
                    <div className="z-10">
                        <div className="bg-[#385183] rounded-3xl shadow-md shadow-secondary border border-[#212638] flex flex-col mt-10 relative">
                            <div className="h-[5rem] w-[5.5rem] bg-[#212638] absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 py-[0.65rem] shadow-lg shadow-[#212638]">
                                <div className="flex items-center justify-center space-x-2">
                                    <p className="my-0 text-sm">Write</p>
                                </div>
                            </div>
                            <div className="p-5 divide-y divide-[#212638]">
                                {contractWriteMethods.methods.length > 0
                                    ? contractWriteMethods.methods
                                    : "No write methods"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
