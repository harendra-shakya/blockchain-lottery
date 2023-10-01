import { useEffect, useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import { isAddress } from "ethers/lib/utils";
import Blockies from "react-blockies";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEnsAvatar, useEnsName } from "wagmi";
import { hardhat } from "wagmi/chains";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { getBlockExplorerAddressLink, getTargetNetwork } from "~~/utils/scaffold-eth";

type TAddressProps = {
    address?: string;
    disableAddressLink?: boolean;
    format?: "short" | "long";
    size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
};

const blockieSizeMap = {
    xs: 6,
    sm: 7,
    base: 8,
    lg: 9,
    xl: 10,
    "2xl": 12,
    "3xl": 15,
};

/**
 * Displays an address (or ENS) with a Blockie image and option to copy address.
 */
export const Address = ({ address, disableAddressLink, format, size = "base" }: TAddressProps) => {
    const [ens, setEns] = useState<string | null>();
    const [ensAvatar, setEnsAvatar] = useState<string | null>();
    const [addressCopied, setAddressCopied] = useState(false);

    const { data: fetchedEns } = useEnsName({ address, enabled: isAddress(address ?? ""), chainId: 1 });
    const { data: fetchedEnsAvatar } = useEnsAvatar({
        address,
        enabled: isAddress(address ?? ""),
        chainId: 1,
        cacheTime: 30_000,
    });

    // We need to apply this pattern to avoid Hydration errors.
    useEffect(() => {
        setEns(fetchedEns);
    }, [fetchedEns]);

    useEffect(() => {
        setEnsAvatar(fetchedEnsAvatar);
    }, [fetchedEnsAvatar]);

    // Skeleton UI
    if (!address) {
        return (
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-md bg-slate-300 h-6 w-6"></div>
                <div className="flex items-center space-y-6">
                    <div className="h-2 w-28 bg-slate-300 rounded"></div>
                </div>
            </div>
        );
    }

    if (!ethers.utils.isAddress(address)) {
        return <span className="text-error">Wrong address</span>;
    }

    const blockExplorerAddressLink = getBlockExplorerAddressLink(getTargetNetwork(), address);
    let displayAddress = address?.slice(0, 5) + "..." + address?.slice(-4);

    if (ens) {
        displayAddress = ens;
    } else if (format === "long") {
        displayAddress = address;
    }

    return (
        <div className="flex items-center">
            <div className="flex-shrink-0">
                {ensAvatar ? (
                    // Don't want to use nextJS Image here (and adding remote patterns for the URL)
                    // eslint-disable-next-line
          <img
                        className="rounded-full"
                        src={ensAvatar}
                        width={(blockieSizeMap[size] * 24) / blockieSizeMap["base"]}
                        height={(blockieSizeMap[size] * 24) / blockieSizeMap["base"]}
                        alt={`${address} avatar`}
                    />
                ) : (
                    <Blockies
                        className="mx-auto rounded-full"
                        size={blockieSizeMap[size]}
                        seed={address.toLowerCase()}
                        scale={3}
                    />
                )}
            </div>
            {disableAddressLink ? (
                <span className={`ml-1.5 text-${size} font-normal`}>{displayAddress}</span>
            ) : getTargetNetwork().id === hardhat.id ? (
                <span className={`ml-1.5 text-${size} font-normal`}>
                    <Link href={blockExplorerAddressLink}>{displayAddress}</Link>
                </span>
            ) : (
                <a
                    className={`ml-1.5 text-${size} font-normal`}
                    target="_blank"
                    href={blockExplorerAddressLink}
                    rel="noopener noreferrer"
                >
                    {displayAddress}
                </a>
            )}
            {addressCopied ? (
                <CheckCircleIcon
                    className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
                    aria-hidden="true"
                />
            ) : (
                <CopyToClipboard
                    text={address}
                    onCopy={() => {
                        setAddressCopied(true);
                        setTimeout(() => {
                            setAddressCopied(false);
                        }, 800);
                    }}
                >
                    <DocumentDuplicateIcon
                        className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
                        aria-hidden="true"
                    />
                </CopyToClipboard>
            )}
        </div>
    );
};
