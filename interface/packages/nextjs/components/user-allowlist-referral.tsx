import { useState } from "react";
import { FC } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Spinner } from "./Spinner";
import CopyToClipboard from "react-copy-to-clipboard";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

const ShareOnTwitterButton = dynamic(() => import("./buttons/ShareOnTwitterButton"), { ssr: false });

interface IUserAllowlistReferral {
    data: {
        walletAddress: string;
        referralCode: string;
        referralPoints: number;
        position: string;
    };
    loading?: boolean;
}

const UserAllowlistReferral: FC<IUserAllowlistReferral> = ({ data, loading }) => {
    const [codeCopied, setCodeCopied] = useState(false);

    const width = "xl:w-[1200px] w-full";

    return (
        <>
            <ShareOnTwitterButton
                btnText="Share"
                _tweetText={`💪 Just applied to be part @ChainWarzGaming allowlist for their airdrop. Use my referral code ${data?.referralCode} and join me in the new era of the decentralized lottery. Apply here 👉 https://chainwarz.io/allowlist ⚔️ !BATTLE`}
                _tweetUrl=""
                _tweetHashtags="airdrop,wl,Ethereum"
                className=""
                loading={!!!data?.position}
            />

            <div className="mx-auto py-14 my-10 rounded-3xl bg-mediumslateblue-200 xl:w-[1350px] w-full flex flex-col items-center  justify-start gap-[46px] text-center default-text-21xl font-orbitron ">
                <p className="m-0 flex flex-col items-center justify-start">
                    <div className="relative leading-[48px] ">
                        <span className="">You are at </span>

                        {!loading ? <span className="text-gradient-tr">#{data?.position}</span> : <Spinner />}

                        <span className="">{` on the `}</span>
                        <Link href="./referral-leaderboard">
                            <span className="[text-decoration:underline] text-cyan">list</span>
                        </Link>
                    </div>
                </p>
                <div className="mx-10">
                    <div className="flex flex-col items-center justify-start gap-[16px] text-right text-3xs text-gray">
                        <div
                            className={`mx-auto flex flex-row items-center justify-between  xl:w-[1150px] lg:w-[950px] md:w-[600px] w-[310px] h-6 text-center text-3xs`}
                        >
                            <p className="">Position</p>
                            <p className="">Name</p>
                            <p className="xl:p-60"></p>
                            <p className="">Referral Code</p>
                            <p className="">Total Points</p>
                        </div>

                        <div
                            className={`mx-auto flex-row flex items-center rounded-3xl text-xs justify-between w-full ${width} h-[74px] bg-mediumslateblue-300 `}
                        >
                            <p className="mx-auto text-white">{data?.position}</p>
                            <p className="mx-auto text-white">You</p>
                            <p className="mx-auto xl:p-60"></p>

                            <p
                                className="mx-auto xl:pr-10 cursor-pointer text-cyan "
                                onClick={() => {
                                    navigator.clipboard.writeText(data?.referralCode!);
                                }}
                            >
                                {data?.referralCode}
                            </p>
                            <p className="mx-auto ">{data?.referralPoints!}</p>
                        </div>
                    </div>
                </div>
                <p className="m-0 relative md:text-5xl text-base  leading-[32px]  inline-block w-[691px]">
                    <span>Invite friends to move up in </span>
                    <Link href="/referral-leaderboard">
                        {" "}
                        <span className="[text-decoration:underline] text-cyan">list</span>
                    </Link>
                </p>
                <div className="flex flex-col items-start justify-start gap-[8px] text-left text-base">
                    <div className="relative leading-[24px] ">Referral Code</div>

                    <div className="flex items-center flex-row py-8 px-6 text-5xl bg-[transparent] w-full lg:w-[791px] rounded-lg box-border justify-between border-[1px] border-solid text-white border-gray">
                        <div className="flex-shrink-0"></div>
                        {!loading ? (
                            <span className="ml-1.5 text-lg font-normal">{data?.referralCode}</span>
                        ) : (
                            <Spinner />
                        )}
                        {codeCopied ? (
                            <CheckCircleIcon
                                className="ml-1.5 text-xl font-normal text-sky-600 h-10 w-10 cursor-pointer"
                                aria-hidden="true"
                            />
                        ) : (
                            <CopyToClipboard
                                text={data?.referralCode!}
                                onCopy={() => {
                                    setCodeCopied(true);
                                    setTimeout(() => {
                                        setCodeCopied(false);
                                    }, 800);
                                }}
                            >
                                <DocumentDuplicateIcon
                                    className="ml-1.5 text-xl font-normal text-sky-600 h-10 w-10 cursor-pointer"
                                    aria-hidden="true"
                                />
                            </CopyToClipboard>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserAllowlistReferral;
