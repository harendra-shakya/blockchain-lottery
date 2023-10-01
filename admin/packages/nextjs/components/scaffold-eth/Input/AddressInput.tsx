import { useCallback, useEffect, useState } from "react";
import { isAddress } from "ethers/lib/utils";
import Blockies from "react-blockies";
import { useEnsAddress, useEnsAvatar, useEnsName } from "wagmi";
import { CommonInputProps, InputBase } from "~~/components/scaffold-eth";

// ToDo:  move this function to an utility file
const isENS = (address = "") => address.endsWith(".eth") || address.endsWith(".xyz");

/**
 * Address input with ENS name resolution
 */
export const AddressInput = ({ value, name, placeholder, onChange }: CommonInputProps) => {
    const { data: ensAddress, isLoading: isEnsAddressLoading } = useEnsAddress({
        name: value,
        enabled: isENS(value),
        chainId: 1,
        cacheTime: 30_000,
    });

    const [enteredEnsName, setEnteredEnsName] = useState<string>();
    const { data: ensName, isLoading: isEnsNameLoading } = useEnsName({
        address: value,
        enabled: isAddress(value),
        chainId: 1,
        cacheTime: 30_000,
    });

    const { data: ensAvatar } = useEnsAvatar({
        address: value,
        enabled: isAddress(value),
        chainId: 1,
        cacheTime: 30_000,
    });

    // ens => address
    useEffect(() => {
        if (!ensAddress) return;

        // ENS resolved successfully
        setEnteredEnsName(value);
        onChange(ensAddress);
    }, [ensAddress, onChange, value]);

    const handleChange = useCallback(
        (newValue: string) => {
            setEnteredEnsName(undefined);
            onChange(newValue);
        },
        [onChange],
    );

    return (
        <InputBase
            name={name}
            placeholder={placeholder}
            error={ensAddress === null}
            value={value}
            onChange={handleChange}
            disabled={isEnsAddressLoading || isEnsNameLoading}
            prefix={
                ensName && (
                    <div className="flex bg-[#212638] rounded-l-full items-center">
                        {ensAvatar ? (
                            <span className="w-[35px]">
                                {
                                    // eslint-disable-next-line
                                    <img className="w-full rounded-full" src={ensAvatar} alt={`${ensAddress} avatar`} />
                                }
                            </span>
                        ) : null}
                        <span className="text-accent px-2">{enteredEnsName ?? ensName}</span>
                    </div>
                )
            }
            suffix={
                value && <Blockies className="!rounded-full" seed={value?.toLowerCase() as string} size={7} scale={5} />
            }
        />
    );
};
