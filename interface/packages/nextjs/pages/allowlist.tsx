import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { disconnect } from "@wagmi/core";
import axios from "axios";
import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";
import { useAccount } from "wagmi";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { Meta } from "~~/components/Meta";
import SocialBtn from "~~/components/buttons/SocialBtn";
import VerifiedBtn from "~~/components/buttons/VerifiedBtn";
import MainLayout from "~~/components/layouts/MainLayout";
import DiscordAlertModal from "~~/components/modals/DiscordAlertModal";
import deleteCookie from "~~/lib/Cookie/deleteCookie";
import setCookie from "~~/lib/Cookie/setCookie";
import fetchDiscordOAuth from "~~/lib/OAuth/fetchDiscordOAuth";
import fetchTwitterOAuth from "~~/lib/OAuth/fetchTwitterOAuth";
import rgbDataURL from "~~/lib/rgbDataURL";
import { parseUser } from "~~/utils/parse-user";

const AllowlistForm = dynamic(() => import("~~/components/allowlist/allowlist-form"), { ssr: false });
const ThankYou = dynamic(() => import("~~/components/allowlist/thank-you"), { ssr: false });

const Allowlist: NextPage<UserSocialData> = ({ user }) => {
    const [nextStep, setNextStep] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [displayTWitter, setDisplayTwitter] = useState<boolean>(!!user.twitter);
    const [displayDiscord, setDisplayDiscord] = useState<boolean>(!!user.discord?.username);

    const { address, isConnected } = useAccount();
    const router = useRouter();

    const _address = address || user?.walletAddress?.address;
    const [displayAddress, setDisplayAddress] = useState<boolean>(_address ? true : false);

    useEffect(() => {
        if (user?.discord && user.discord?.notDiscordMember) {
            setShowModal(true);
        }

        validateUser();
    }, [user, address]);

    useEffect(() => {
        if (isConnected) {
            setDisplayAddress(!!address);
            setCookie(process.env.NEXT_PUBLIC_WALLET_ADDRESS_COOKIE_NAME!, { address: address });
        }
    }, [address]);

    const validateUser = async () => {
        try {
            const res = await axios.get("/api/validateUser", {
                params: {
                    discordUsername: user.discord ? `${user.discord.username}#${user.discord.discriminator}` : null,
                    twitterUsername: user.twitter ? user.twitter.screenName : null,
                    walletAddress: _address,
                },
            });

            const alreadyExists = res.data.response;

            if (alreadyExists) setSubmitted(true);
        } catch (error: any) {
            console.log("Error in validating user", error);
        }
    };

    const completeStep = async () => {
        try {
            const stepsCompeted = user.discord && displayTWitter && displayAddress;
            if (stepsCompeted) {
                setNextStep(true);
                setErrorMessage("");
            } else setErrorMessage("*Please complete all the steps");
        } catch (error: any) {
            // setErrorMessage(error.response.data.error);
            console.log("Error", error);
            console.log("ERROR");
        }
    };

    const StepBtn = ({ stepNum, callback }: { stepNum: string; callback: () => void }) => {
        return (
            <div className="mx-auto flex flex-col items-center  ">
                <p className="m-0 leading-[24px] ">Step</p>

                <button
                    className={`text-white cursor-pointer p-6 rounded-3xl  box-border w-[88px] items-center justify-center border-[1px] border-solid border-[rgba(255,] text-13xl leading-[40px]  font-orbitron  ${
                        stepNum === "1" && nextStep
                            ? "primary-gradient-tr"
                            : stepNum === "2" && !nextStep
                            ? "bg-black"
                            : "primary-gradient-tr"
                    }`}
                    onClick={callback}
                >
                    {stepNum}
                </button>
            </div>
        );
    };

    return (
        <div>
            {!submitted ? (
                <MainLayout className="items-center">
                    <>
                        {showModal && (
                            <DiscordAlertModal
                                onClose={async () => {
                                    await deleteCookie(process.env.NEXT_PUBLIC_DISCORD_COOKIE_NAME!);
                                    setShowModal(false);
                                }}
                            />
                        )}

                        <h1 className="m-0 mt-40 default-text-77xl leading-[104px]  pb-5 uppercase h-shadow ">
                            Allowlist
                        </h1>
                        {/** steps */}
                        <div className="w-[259px] h-[116px] text-base pb-20">
                            <div className="flex flex-row items-center ">
                                <StepBtn
                                    stepNum="1"
                                    callback={() => {
                                        setNextStep(false);
                                    }}
                                />

                                <div className=" box-border w-[84px] h-px shrink-0 border-t-[1px] border-solid border-gray-100" />
                                <StepBtn stepNum="2" callback={completeStep} />
                            </div>
                        </div>
                        {/* Allowlist Step 1 */}
                        {!nextStep && (
                            <>
                                <Meta
                                    title={"Chain Warz Allowlist | Allowlist Application - Step 1 | Connect & Verify"}
                                    description={
                                        "Join the Chain Warz Allowlist and unlock exclusive perks for the vibrant Chain Warz community. Start your exciting journey by seamlessly connecting your Twitter, Discord, and ETH wallet. Take the crucial first step towards becoming a valued member of our dynamic Chain Warz blockchain community. Apply now and gain access to an exceptional experience like no other!"
                                    }
                                    imageUrl="https://chainwarz.io/chainwarzMetaLogo.jpg"
                                    url="https://chainwarz.io/allowlist"
                                />

                                <section className="mx-auto 2xl:scale-100 scale-[.90] flex  flex-col items-center  w-full h-full shrink-0 overflow-hidden text-left  pb-20">
                                    {/** container */}
                                    <div className="flex flex-col items-center justify-start gap-[72px]">
                                        <div className="mx-10">
                                            <div className="mx-auto  rounded-13xl  bg-mediumslateblue-200 flex flex-col pt-16 px-12 pb-12 items-center justify-center gap-[48px]">
                                                <p className="m-0 leading-[40px] text-13xl">Link YOUR</p>
                                                <div className="flex md:flex-row flex-col items-start justify-center gap-[24px]">
                                                    {/** twitter */}
                                                    {!displayTWitter ? (
                                                        <SocialBtn
                                                            name="Twitter"
                                                            imgName="/icons/twitter/twitterGradient.svg"
                                                            callback={async () => {
                                                                const authUrl = await fetchTwitterOAuth();
                                                                router.push(authUrl!);
                                                            }}
                                                        />
                                                    ) : (
                                                        <VerifiedBtn
                                                            username={user?.twitter?.screenName?.toString()!}
                                                            callback={async () => {
                                                                await deleteCookie(
                                                                    process.env.NEXT_PUBLIC_TWITTER_COOKIE_NAME!,
                                                                );
                                                                setDisplayTwitter(false);
                                                            }}
                                                        />
                                                    )}

                                                    {/** discord */}
                                                    {!displayDiscord ? (
                                                        <div className="flex flex-col justify-center items-center gap-4">
                                                            <SocialBtn
                                                                name="Discord"
                                                                imgName="/icons/discord/discordGradient.svg"
                                                                callback={async () => {
                                                                    const authUrl = await fetchDiscordOAuth();
                                                                    router.push(authUrl!);
                                                                }}
                                                            />
                                                            <div>
                                                                Make sure you're in our{" "}
                                                                <Link
                                                                    href="https://discord.gg/srbptHMb2W"
                                                                    target="_blank"
                                                                    className="text-white"
                                                                >
                                                                    Discord
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <VerifiedBtn
                                                            username={`${user.discord?.username}#${user.discord?.discriminator}`}
                                                            callback={async () => {
                                                                await deleteCookie(
                                                                    process.env.NEXT_PUBLIC_DISCORD_COOKIE_NAME!,
                                                                );
                                                                setDisplayDiscord(false);
                                                            }}
                                                        />
                                                    )}
                                                </div>

                                                <div className="flex flex-col mx-2 items-center justify-start gap-[48px]">
                                                    {displayAddress ? (
                                                        <div className="flex flex-items items-center gap-4">
                                                            <p className="m-0 flex flex-wrap mx-auto  leading-[40px] text-13xl ">
                                                                Connected Wallet Address
                                                            </p>
                                                            <ArrowRightOnRectangleIcon
                                                                className="w-8 h-8 cursor-pointer"
                                                                onClick={async () => {
                                                                    isConnected && (await disconnect());
                                                                    await deleteCookie(
                                                                        process.env
                                                                            .NEXT_PUBLIC_WALLET_ADDRESS_COOKIE_NAME!,
                                                                    );
                                                                    setDisplayAddress(false);
                                                                }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="scale-[1.3] text-xl">
                                                            <ConnectButton />
                                                        </div>
                                                    )}

                                                    <input
                                                        className=" text-13xl cw-input w-full flex flex-wrap"
                                                        type="text"
                                                        placeholder={`${
                                                            displayAddress ? _address : "Connect Your Wallet"
                                                        }`}
                                                        disabled={true}
                                                    />
                                                </div>
                                                <p className="m-0 -mb-8 text-5xl text-moderate-pink">{errorMessage}</p>
                                                <button
                                                    className={`cw-btn py-8 px-12 w-full flex flex-row  items-center justify-center gap-[20px] ${
                                                        user.discord && user.twitter && !!displayAddress
                                                            ? "bg-white"
                                                            : "bg-gray hover:opacity-100 cursor-not-allowed"
                                                    }`}
                                                    onClick={completeStep}
                                                >
                                                    <p className="m-0 text-13xl text-gradient-tr">Next</p>
                                                    <Image
                                                        width={24}
                                                        height={24}
                                                        loading="lazy"
                                                        className=" w-12 h-12 shrink-0"
                                                        alt=""
                                                        src="/icons/arrows/leftArrowGradient.svg"
                                                        placeholder="blur"
                                                        blurDataURL={rgbDataURL(130, 51, 255)}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </>
                        )}
                        {/* Allowlist Step 2 */}
                        {nextStep && <AllowlistForm user={user} callback={() => setSubmitted(true)} />}
                    </>
                </MainLayout>
            ) : (
                <ThankYou user={user} />
            )}
        </div>
    );
};

export default Allowlist;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    try {
        const user = {
            discord: {},
            twitter: {},
            walletAddress: {},
        };

        const _discordUser = parseUser(ctx, process.env.NEXT_PUBLIC_DISCORD_COOKIE_NAME!);
        const _twitterUser = parseUser(ctx, process.env.NEXT_PUBLIC_TWITTER_COOKIE_NAME!);
        const _walletAddress = parseUser(ctx, process.env.NEXT_PUBLIC_WALLET_ADDRESS_COOKIE_NAME!);

        user["discord"] = _discordUser!;
        user["twitter"] = _twitterUser!;
        user["walletAddress"] = _walletAddress!;

        ctx.res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");
        return { props: { user } };
    } catch (e) {
        console.log(e);
    }
}
