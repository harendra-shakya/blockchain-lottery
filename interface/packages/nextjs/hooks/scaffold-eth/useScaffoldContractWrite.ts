import { useState } from "react";
import { Abi, ExtractAbiFunctionNames } from "abitype";
import { utils } from "ethers";
import { useContractWrite, useNetwork } from "wagmi";
import { getParsedEthersError } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useTransactor } from "~~/hooks/scaffold-eth";
import { getTargetNetwork, notification } from "~~/utils/scaffold-eth";
import { ContractAbi, ContractName, UseScaffoldWriteConfig } from "~~/utils/scaffold-eth/contract";

/**
 * @dev wrapper for wagmi's useContractWrite hook(with config prepared by usePrepareContractWrite hook) which loads in deployed contract abi and address automatically
 * @param config - The config settings, including extra wagmi configuration
 * @param config.contractName - deployed contract name
 * @param config.functionName - name of the function to be called
 * @param config.args - arguments for the function
 * @param config.value - value in ETH that will be sent with transaction
 */
export const useScaffoldContractWrite = <
    TContractName extends ContractName,
    TFunctionName extends ExtractAbiFunctionNames<ContractAbi<TContractName>, "nonpayable" | "payable">,
>({
    contractName,
    functionName,
    args,
    value,
    onBlockConfirmation,
    blockConfirmations,
    ...writeConfig
}: UseScaffoldWriteConfig<TContractName, TFunctionName>) => {
    const { data: deployedContractData } = useDeployedContractInfo(contractName);
    const { chain } = useNetwork();
    const writeTx = useTransactor();
    const [isMining, setIsMining] = useState(false);
    const configuredNetwork = getTargetNetwork();

    const { overrides, ...restConfig } = writeConfig;

    const wagmiContractWrite = useContractWrite({
        mode: "recklesslyUnprepared",
        chainId: configuredNetwork.id,
        address: deployedContractData?.address,
        abi: deployedContractData?.abi as Abi,
        args: args as unknown[],
        functionName: functionName as any,
        overrides: {
            value: value ? utils.parseEther(value) : undefined,
            ...overrides,
        },
        ...restConfig,
    });

    const sendContractWriteTx = async ({
        args,
        value,
        overrides,
    }: {
        args?: UseScaffoldWriteConfig<TContractName, TFunctionName>["args"];
        value?: UseScaffoldWriteConfig<TContractName, TFunctionName>["value"];
        overrides?: UseScaffoldWriteConfig<TContractName, TFunctionName>["overrides"];
    } = {}) => {
        if (!deployedContractData) {
            notification.error("Target Contract is not deployed, did you forgot to run `yarn deploy`?");
            return;
        }
        if (!chain?.id) {
            notification.error("Please connect your wallet");
            return;
        }
        if (chain?.id !== configuredNetwork.id) {
            notification.error("You on the wrong network");
            return;
        }

        if (wagmiContractWrite.writeAsync) {
            try {
                setIsMining(true);
                await writeTx(
                    wagmiContractWrite.writeAsync({
                        recklesslySetUnpreparedArgs: args as unknown[],
                        recklesslySetUnpreparedOverrides:
                            value && overrides
                                ? { value: utils.parseEther(value), ...overrides }
                                : value
                                ? { value: utils.parseEther(value) }
                                : overrides
                                ? overrides
                                : undefined,
                    }),
                    { onBlockConfirmation, blockConfirmations },
                );
            } catch (e: any) {
                const message = getParsedEthersError(e);
                notification.error(message);
            } finally {
                setIsMining(false);
            }
        } else {
            notification.error("Contract writer error. Try again.");
            return;
        }
    };

    return {
        ...wagmiContractWrite,
        isMining,
        // Overwrite wagmi's write async
        writeAsync: sendContractWriteTx,
    };
};
