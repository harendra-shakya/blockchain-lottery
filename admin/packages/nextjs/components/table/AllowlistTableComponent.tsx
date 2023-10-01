import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "../modal";
import TableComponent from "./TableComponent";
import axios from "axios";
import moment from "moment";
import { useSession } from "next-auth/react";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";

interface IAllowlistTableComponent {
    allowlistData: Record<string, string | number>;
    callback: () => void;
}

export default function AllowlistTableComponent({ allowlistData, callback }: IAllowlistTableComponent) {
    const [showModal, setShowModal] = useState(false);
    const { data: session } = useSession();

    const formatEthereumAddress = (address: string) => {
        const prefix = address.slice(0, 6);
        const suffix = address.slice(-4);
        return `${prefix}....${suffix}`;
    };

    const acceptApplication = async () => {
        try {
            const status = "accepted";
            const user = session?.user;
            const walletAddress = allowlistData.walletAddress;
            await axios.post("/api/updateApplicationStatus", { user, status, walletAddress });

            // UI
            allowlistData.status = status;

            callback();
            console.log("SUCCESS");
        } catch (error: any) {
            // setErrorMessage(error.response.data.error);
            console.log("Error", error);
        }
    };

    const declineApplication = async () => {
        try {
            const status = "declined";
            const walletAddress = allowlistData.walletAddress;
            const user = session?.user;

            await axios.post("/api/updateApplicationStatus", { user, status, walletAddress });

            // UI
            allowlistData.status = status;
            callback();
            console.log("SUCCESS");
        } catch (error: any) {
            // setErrorMessage(error.response.data.error);
            console.log("Error", error);
        }
    };

    return (
        <>
            {showModal && (
                <Modal
                    onClose={() => setShowModal(false)}
                    allowlistData={allowlistData}
                    acceptApplication={acceptApplication}
                    declineApplication={declineApplication}
                />
            )}

            <TableComponent
                key={`userinfo-${allowlistData.walletAddress}`}
                rowArray={[
                    <p key="twitterUsername">
                        <Link
                            href={`https://twitter.com/${allowlistData.twitterUsername}`}
                            className="link"
                            target="_blank"
                        >
                            {allowlistData.twitterUsername}
                        </Link>
                    </p>,

                    <p key="discordUsername">{allowlistData.discordUsername}</p>,

                    <p key="application-submit-date">{moment.unix(+allowlistData.timestamp).format("DD.MM.YYYY")}</p>,

                    <p key="wallet-address">
                        <Link
                            href={`https://etherscan.io/address/${allowlistData.walletAddress}`}
                            className="link"
                            target="_blank"
                        >
                            {formatEthereumAddress(allowlistData.walletAddress.toString())}
                        </Link>
                    </p>,

                    <div className="flex flex-row w-48 h-[42px] mr-1" key="buttons">
                        <button
                            className="cursor-pointer py-3 px-6 bg-[transparent] mx-auto  rounded-xl box-border w-20 overflow-hidden flex flex-row items-center justify-center border-[1px] border-solid border-[rgba(255,]"
                            onClick={() => setShowModal(true)}
                        >
                            <p className=" relative text-xs leading-[18px]  font-orbitron text-white text-center">
                                Check
                            </p>
                        </button>
                        <button
                            className="cursor-pointer py-3 px-6 bg-[transparent] mx-auto left-[88px] rounded-xl box-border w-12 overflow-hidden flex flex-row items-center justify-center border-[1px] border-solid border-[rgba(255,]"
                            onClick={acceptApplication}
                        >
                            {allowlistData.status == "accepted" ? (
                                <HandThumbUpIcon className="relative fill-white w-4 h-4 shrink-0" />
                            ) : (
                                <Image
                                    width={24}
                                    height={24}
                                    className="relative w-4 h-4 shrink-0"
                                    alt=""
                                    src="/thumbsup.svg"
                                    loading="lazy"
                                />
                            )}
                        </button>
                        <button
                            className="cursor-pointer py-3 px-6 bg-[transparent] mx-auto rounded-xl box-border w-12 overflow-hidden flex flex-row items-center justify-center border-[1px] border-solid border-[rgba(255,]"
                            onClick={declineApplication}
                        >
                            {allowlistData.status == "declined" ? (
                                <HandThumbDownIcon className="relative fill-white w-4 h-4 shrink-0" />
                            ) : (
                                <Image
                                    width={24}
                                    height={24}
                                    className="relative w-4 h-4 shrink-0"
                                    alt=""
                                    src="/thumbsdown.svg"
                                    loading="lazy"
                                />
                            )}
                        </button>
                    </div>,
                ]}
            />
        </>
    );
}
