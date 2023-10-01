import { useEffect } from "react";
import { useState } from "react";
import ContentContainer from "../ContentContainer";
import UserAllowlistReferral from "../user-allowlist-referral";
import axios from "axios";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import { Meta } from "~~/components/Meta";
import MainLayout from "~~/components/layouts/MainLayout";

const ThankYou: NextPage<UserSocialData> = ({ user }) => {
    const { address } = useAccount();
    const [data, SetData] = useState<{
        walletAddress: string;
        referralCode: string;
        referralPoints: number;
        position: string;
    }>();

    useEffect(() => {
        updateUI();
    }, []);

    const updateUI = async () => {
        getReferralCode();
    };

    const getReferralCode = async () => {
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
        }
    };

    return (
        <div>
            <Meta
                title={"Application Acknowledged | Chain Warz - Ready to Elevate You"}
                description={
                    "We appreciate your interest! Thanks for applying to Chain Warz's allowlist. You're now one step closer to joining the revolution of gamified, decentralized lottery. Keep an eye out for further updates."
                }
                imageUrl="https://chainwarz.io/chainwarzMetaLogo.jpg"
                url="https://chainwarz.io/allowlist"
            />

            <MainLayout className="pt-40  w-full h-full text-center">
                <ContentContainer className="text-5xl">
                    <>
                        <p className=" my-8 default-text-53xl text-gradient-br ">We’re bullish on you!</p>

                        <p className="leading-[32px] inline-block lg:w-[1193px]">
                            Thank you for taking the time to complete our questionnaire! Your input is invaluable to us,
                            and it helps us build a strong and engaged community.
                        </p>

                        <p className="leading-[32px] inline-block lg:w-[1193px]">
                            Our team is currently reviewing your responses, and we'll notify you if you've been granted
                            the allowList role in our Discord community.
                        </p>

                        <div className="mt-8">
                            <UserAllowlistReferral data={data!} loading={!!!data?.position} />
                        </div>

                        {data?.position && (
                            <>
                                <div className="flex flex-col items-center md:text-7xl">
                                    <p className="lg:w-[827px]">
                                        We appreciate your interest in Chain Warz and can't wait to share our exciting
                                        platform with you!
                                    </p>
                                    <p className="mt-6">Best regards</p>
                                    <p className="-mt-4">The Chain Warz Team</p>
                                </div>
                            </>
                        )}
                    </>
                </ContentContainer>
            </MainLayout>
        </div>
    );
};

export default ThankYou;
