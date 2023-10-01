import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import subscribeBot from "../../public/images/bots/subscribe.png";
import BlueContainer from "../BlueContainer";
import SectionContainer from "../SectionContainer";
import Button from "../buttons/Button";
import axios from "axios";
import crypto from "crypto";
import type { NextPage } from "next";

const ShareOnTwitterButton = dynamic(() => import("../buttons/ShareOnTwitterButton"), { ssr: false });

const key = process.env.NEXT_PUBLIC_CRYPTOGRAPHY_SECRET_KEY!; // Key for cryptograpy. Keep it secret

const Subscribe: NextPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [needOTP, setNeedOTP] = useState<boolean>(false);
    const [verified, setVerified] = useState<boolean>(false);

    const [email, setEmail] = useState<null | string>(null);
    const [OTP, SetOTP] = useState<string>("");
    const [hash, setHash] = useState<null | string>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const subscribe = async () => {
        try {
            await axios.post("/api/subscribe", { email });

            // console.log("SUCCESS: Subscribed for updates");
        } catch (error: any) {
            setErrorMessage(error.response.data.error);
            console.log("ERROR");
        }
    };

    const sendEmail = async (otp: string) => {
        try {
            const response = await axios.post("/api/sendEmail", { email, otp });
            // console.log("Email sent for otp");
            setNeedOTP(response.status === 200);
        } catch (e: any) {
            setErrorMessage(e.response.data.error);
            console.log("ERROR");
        }
    };

    function createOTPAndSendEmail() {
        // Generate a 6 digit numeric OTP
        setLoading(true);
        const len = 5;
        const min = Math.pow(10, len);
        const max = Math.pow(10, len + 1) - 1;
        const otp = Math.floor(Math.random() * (max - min + 1) + min).toString();

        const ttl = 5 * 60 * 1000; // 5 Minutes in miliseconds
        const expires = Date.now() + ttl; //timestamp to 5 minutes in the future
        const data = `${email}.${otp}.${expires}`; // email.otp.expiry_timestamp
        const hash = crypto.createHmac("sha256", key!).update(data).digest("hex"); // creating SHA256 hash of the data
        const fullHash = `${hash}.${expires}`;

        setHash(fullHash);
        sendEmail(otp);

        setNeedOTP(true);

        setLoading(false);
        return fullHash;
    }

    function verifyOTP(otp: string) {
        setLoading(true);

        // Seperate Hash value and expires from the hash returned from the user
        const [hashValue, expires] = hash!.split(".");
        // Check if expiry time has passed
        const now = Date.now();
        if (now > parseInt(expires)) {
            setErrorMessage("OTP Expired");
            return false;
        }
        // Calculate new hash with the same key and the same algorithm
        const data = `${email}.${otp}.${expires}`;
        const newCalculatedHash = crypto.createHmac("sha256", key).update(data).digest("hex");
        // Match the hashes
        if (newCalculatedHash === hashValue) {
            // console.log("verified, correct otp");
            setVerified(true);
            subscribe();
            return true;
        } else {
            // console.log("error, wrong otp");
            setErrorMessage("Incorrect OTP");
        }

        setLoading(false);

        return false;
    }

    return (
        <SectionContainer id="subscribe">
            <BlueContainer>
                <div className="text-left 2xl:mx-40 xl:mx-16 lg:mx-16 md:mx-10 mx-4 my-4 lg:my-20">
                    <div className="mx-auto w-full h-full flex flex-col lg:flex-row items-center gap-[40px] py-10">
                        <div className="flex flex-col w-full h-full  items-start justify-center gap-[40px]">
                            <h2 className="m-0 mx-auto lg:mx-0 default-text-53xl default-tracking uppercase text-center lg:whitespace-nowrap h-shadow">
                                Coming Soon
                            </h2>
                            <p className="m-0 mx-auto md:px-0 px-2 lg:mx-0 text-5xl default-tracking leading-[32px] text-gray inline-block 2xl:w-[681px]">
                                {`${
                                    verified
                                        ? "We're bullish on you! Stay tuned for updates."
                                        : "Sign up for updates, follow us on Twitter, and engage with our lively Discord community. Join the Chain Warz community, and we'll notify you before we launch for !BATTLE"
                                }`}
                            </p>

                            {verified ? (
                                <>
                                    <ShareOnTwitterButton
                                        btnText="Share"
                                        _tweetText="Just joined the @ChainWarzGaming revolution! 🚀
                                            
                                            %0ADecentralized. Gamified. Gasless. 🔥
                                            
                                            %0AJoin the ranks of the brave and receive updates from the future of the crypto lottery. 🫡
                                            
                                            %0A%0A🤖 https://chainwarz.io/ 🤖
                                            
                                            %0A%0A"
                                        _tweetUrl=""
                                        _tweetHashtags="Blockchain,Ethereum,Airdrop,ChainWarz"
                                        className="lg:mx-0"
                                    />
                                </>
                            ) : (
                                <>
                                    {" "}
                                    <div className="flex flex-col mx-auto lg:mx-0 items-start justify-center gap-[8px] text-base">
                                        <p className="m-0  leading-[24px] uppercase">E-mail</p>
                                        <input
                                            className="cw-input md:w-[400px]  w-[250px]"
                                            type="text"
                                            disabled={needOTP}
                                            defaultValue=""
                                            placeholder="Your e-mail"
                                            onChange={event => setEmail(event?.target?.value ?? "")}
                                        />
                                        {needOTP && (
                                            <>
                                                <p className="m-0  leading-[24px] uppercase">OTP</p>
                                                <input
                                                    className="input md:w-[400px]  w-[250px]"
                                                    type="text"
                                                    defaultValue=""
                                                    placeholder="Enter OTP"
                                                    onChange={event => SetOTP(event?.target?.value ?? "")}
                                                />
                                            </>
                                        )}

                                        <p
                                            className={` ${
                                                errorMessage == "" ? "text-green-300" : "text-moderate-pink"
                                            } m-0  leading-[24px]`}
                                        >
                                            {`${
                                                needOTP && errorMessage.length < 1
                                                    ? "Verify your email with the code we've sent."
                                                    : errorMessage
                                            }`}
                                        </p>
                                    </div>
                                    <Button
                                        text={!needOTP ? "Join Us" : "Verify"}
                                        className="lg:mx-0"
                                        onClick={() => {
                                            if (!email?.includes("@")) {
                                                setErrorMessage("Please enter a correct email!");
                                                return;
                                            }
                                            setErrorMessage("");
                                            needOTP ? verifyOTP(OTP) : createOTPAndSendEmail();
                                        }}
                                        loading={loading}
                                    />
                                </>
                            )}
                        </div>

                        <Image
                            width={500}
                            height={500}
                            className={`flex flex-wrap mx-auto 4xl:w-[583px] 4xl:h-[583px] 2xl:w-[500px] 2xl:h-[500px] lg:w-[450px] lg:h-[450px]  md:w-[403px] md:h-[403px] w-[343px] h-[343px] object-cover`}
                            alt=""
                            src={subscribeBot}
                            loading="lazy"
                            placeholder="blur"
                        />
                    </div>
                </div>
            </BlueContainer>
        </SectionContainer>
    );
};

export default Subscribe;
