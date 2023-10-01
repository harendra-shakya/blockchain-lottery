/* eslint-disable  @typescript-eslint/no-non-null-asserted-optional-chain */
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { disconnect } from "@wagmi/core";
import axios from "axios";
import moment from "moment";
import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";
import { useAccount } from "wagmi";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import ContentContainer from "~~/components/ContentContainer";
import { Meta } from "~~/components/Meta";
import { Spinner } from "~~/components/Spinner";
import Button from "~~/components/buttons/Button";
import MainLayout from "~~/components/layouts/MainLayout";
import TableComponent from "~~/components/table/TableComponent";
import TableNav from "~~/components/table/TableNav";
import db from "~~/firebase";
import truncateAddress from "~~/lib/Truncate/truncateAddress";
import { parseUser } from "~~/utils/parse-user";

const ShareOnTwitterButton = dynamic(() => import("../components/buttons/ShareOnTwitterButton"), { ssr: false });
interface IReferralLeaderboard {
    user: SocialData;
    referralsData: Record<string, string | number>[];
}

const ReferralLeaderboard: NextPage<IReferralLeaderboard> = ({ user, referralsData }) => {
    const { address } = useAccount();
    const [referrals, setReferrals] = useState<Record<string, string | number>[]>();

    const [limit, setLimit] = useState(10);
    const [data, SetData] = useState<{
        walletAddress: string;
        referralCode: string;
        referralPoints: number;
        position: number;
    }>();
    const [loading, setLoading] = useState(false);
    const [fetchedUserPosition, setFetchedUserPosition] = useState(false);

    useEffect(() => {
        setReferrals(referralsData);
    }, []);

    useEffect(() => {
        updateUI();
    }, [address]);

    const updateUI = async () => {
        getReferralCode();
    };

    const getReferralCode = async () => {
        setFetchedUserPosition(false);

        const discordUsername = user.discord ? `${user.discord.username}#${user.discord.discriminator}` : null;
        const twitterUsername = user.twitter ? user.twitter.screenName : null;
        const walletAddress = user.walletAddress ? user.walletAddress.address : address;

        try {
            const res = await axios.get("/api/fetchReferralCode", {
                params: {
                    discordUsername: discordUsername,
                    twitterUsername: twitterUsername,
                    walletAddress: walletAddress,
                },
            });
            SetData(res.data.referral);
        } catch (e) {
            console.log(e);
        } finally {
            setFetchedUserPosition(true);
        }
    };

    const fetchAllowlistReferrals = async () => {
        try {
            setLoading(true);
            const newLimit = limit + 10;

            setLimit(newLimit);

            const res = await axios.get("/api/fetchAllowlistReferrals", {
                params: {
                    limit: limit,
                },
            });

            setReferrals(res.data.response);
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const TABLE_WIDTH = "xl:w-[1200px] w-full";

    return (
        <div>
            <Meta
                title={"Allowlist Leaderboard | Chain Warz - The Battle of Referrals Unfolds"}
                description={
                    "Be the first to secure your spot on the allowlist! Share your referral link and unlock exciting rewards. Ascend the leaderboard for a chance to claim the highest rewards. Discover who's leading the charge. Join the competition now!"
                }
                imageUrl="https://chainwarz.io/chainwarzMetaLogo.jpg"
                url="https://chainwarz.io/referral-leaderboard"
            />

            <MainLayout className="pt-40  w-full h-full text-center">
                <ContentContainer className="text-5xl">
                    <>
                        <h1 className="default-text-53xl text-white my-6 h-shadow">Referral Leaderboard</h1>

                        {data?.referralCode && (
                            <p className="leading-[32px]  text-white text-center inline-block xl:w-[996px] md:w-[700px] w-full my-6">
                                Share your referral link to get more rewards! Move up in the table and get on the top
                                step for the highest reward
                            </p>
                        )}

                        {!data?.position && !(address || user.walletAddress) && (
                            <>
                                <div className="scale-[1.3] text-xl mx-auto flex flex-col items-center">
                                    <ConnectButton />
                                </div>
                                <p className="inline-block">
                                    Connect you wallet to view your position on the allowlist.
                                </p>
                            </>
                        )}

                        {!data?.position && (address || user.walletAddress) && (
                            <>
                                {fetchedUserPosition ? (
                                    <p className=" leading-[32px] inline-block lg:w-[1193px] h-full">
                                        You haven't applied for the{" "}
                                        <Link href="/allowlist" className="[text-decoration:underline] text-cyan">
                                            allowlist
                                        </Link>{" "}
                                        yet. We encourage you to apply and become a valuable member of our incredible
                                        community.
                                        <ArrowRightOnRectangleIcon
                                            className="w-8 h-8 cursor-pointer ml-2 -mb-2"
                                            onClick={() => {
                                                disconnect();
                                            }}
                                        />
                                    </p>
                                ) : (
                                    <div className="scale-[1.7] mt-10">
                                        <Spinner />
                                    </div>
                                )}
                            </>
                        )}

                        <TableNav
                            titles={["Position", "Name", "", "Referral Code", "Total Points"]}
                            classNames={["flex-1", "flex-1", "lg:flex-4 flex-1", "flex-1", "flex-1"]}
                            width={TABLE_WIDTH}
                        />

                        <div
                            className={`mx-auto text-xs w-full flex flex-col items-center justify-between gap-[12px] mb-10 ${
                                !referrals && "animate-pulse"
                            }`}
                        >
                            {data?.referralCode && (
                                <TableComponent
                                    rows={[
                                        data?.position!.toString(),
                                        "You",
                                        "",
                                        data?.referralCode,
                                        data?.referralPoints.toString(),
                                    ]}
                                    key={`leaderboard-${data?.position}`}
                                    classNames={["flex-1", "flex-1", "lg:flex-4 flex-1", "flex-1 text-cyan", "flex-1"]}
                                    width={TABLE_WIDTH}
                                    bg="bg-mediumslateblue-300"
                                />
                            )}

                            {referrals?.map((referral, i) => (
                                <TableComponent
                                    rows={[
                                        (i + 1).toString(),
                                        truncateAddress(referral.walletAddress.toString()),
                                        "",
                                        referral.referralCode.toString(),
                                        referral.referralPoints.toString(),
                                    ]}
                                    key={`leaderboard-${referral.walletAddress}`}
                                    classNames={["flex-1", "flex-1", "lg:flex-4 flex-1", "flex-1 text-cyan", "flex-1"]}
                                    width={TABLE_WIDTH}
                                />
                            ))}

                            {loading && (
                                <div className=" scale-[1.7] mt-10">
                                    <Spinner />
                                </div>
                            )}
                        </div>

                        <Button
                            text="Load More"
                            className="mb-16"
                            onClick={fetchAllowlistReferrals}
                            loading={loading}
                        />

                        {data?.position && (
                            <ShareOnTwitterButton
                                btnText="Share"
                                _tweetText={`🏆 Just climbed to rank ${data?.position} on @ChainWarzGaming leaderboard! Experience the thrill and excitement of the battles. See the leaderboards here 👉 https://chainwarz.io/referral-leaderboard ⚔️ !BATTLE`}
                                _tweetUrl=""
                                _tweetHashtags="Ethereum,allowlist"
                                className="mb-20"
                            />
                        )}
                    </>
                </ContentContainer>
            </MainLayout>
        </div>
    );
};

export default ReferralLeaderboard;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    try {
        const snapshot = await db.collection("allowlist").limit(10).orderBy("referralPoints", "desc").get();

        const referralsData = await Promise.all(
            snapshot.docs.map(async doc => ({
                walletAddress: doc.id,
                timestamp: moment(doc.data().timestamp.toDate()).unix(),
                referralCode: doc.data().referralCode,
                referralPoints: doc.data().referralPoints,
                twitterUsername: doc.data().twitterUsername,
            })),
        );

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
        return {
            props: {
                user,
                referralsData,
            },
        };
    } catch (e) {
        console.log(e);
    }
}
