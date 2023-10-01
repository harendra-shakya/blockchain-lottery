import React from "react";
import { useState } from "react";
import { FC } from "react";
import { Meta } from "../Meta";
import Button from "../buttons/Button";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { allowlistQuestions } from "~~/constants/questions";
import { notification } from "~~/utils/scaffold-eth";

interface IAllowlistForm {
    user: SocialData;
    callback: () => void;
}

const AllowlistForm: FC<IAllowlistForm> = ({ user, callback }) => {
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm();

    const onChange = (value: string | null) => {
        setIsCaptchaValid(!!value);
    };

    const onSubmit = async (data: Record<string, string>) => {
        if (!isCaptchaValid) {
            notification.error("Please submit captcha! Reload if captcha not rendered.");
            return;
        }

        if (data == undefined) {
            notification.error("Data is undefined");
            return;
        }
        if (user?.discord?.username == undefined) {
            notification.error("Your Discord is undefined");
            return;
        }
        if (user?.twitter?.screenName == undefined) {
            notification.error("Your twitter is undefined");
            return;
        }
        if (user?.walletAddress?.address == undefined) {
            notification.error("Your wallet address is undefined");
            return;
        }

        setLoading(true);

        let res;

        try {
            res = await axios.post("/api/storeAllowlistQuestions", {
                data: {
                    ...data,
                    walletAddress: user?.walletAddress?.address,
                    discordUsername: `${user?.discord?.username}#${user?.discord?.discriminator}`,
                    twitterUsername: user?.twitter?.screenName,
                },
            });

            if (res.status === 201) {
                alert(res.data.error);
            }

            if (res.status === 200) callback();
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            console.log("Error", error);
        }
    };

    const width = "3xl:w-[1121px] 2xl:w-[1021px] xl:w-[921px] lg:w-[821px] w-full";

    const Input = ({
        registerKey,
        question,
        placeholder,
        minimumNumberOfCharacters,
        required,
    }: {
        registerKey: string;
        question: string;
        placeholder: string;
        minimumNumberOfCharacters: string;
        required: boolean;
    }) => {
        const [answer, setAnswer] = useState("");

        return (
            <div className="text-13xl text-white font-orbitron">
                <Meta
                    title={"Chain Warz Allowlist | Allowlist Application - Step 2 | Share Your Story"}
                    description={
                        "Complete the Chain Warz allowlist application by answering our questionnaire. Help us understand your passion for blockchain and Chain Warz and why you'd make a great addition to our community."
                    }
                    imageUrl="https://chainwarz.io/chainwarzMetaLogo.jpg"
                    url="https://chainwarz.io/allowlist"
                />
                <div className={`${width}`}>
                    <p className={`leading-[40px]  ${width} shrink-0`}>{question}</p>

                    <div
                        className={`mx-auto p-[1px] pr-[5px] rounded-lg w-[-4px] ${width}
              
              ${
                  answer === ""
                      ? "bg-white"
                      : answer.length < +minimumNumberOfCharacters || answer.length > 500
                      ? "bg-moderate-pink"
                      : "primary-gradient-tr"
              }`}
                    >
                        <textarea
                            className={`mx-auto
          font-orbitron  text-5xl  bg-black rounded-lg w-full h-[180px] flex flex-wrap py-8 text-white `}
                            {...register(registerKey, {
                                required: required,
                                minLength: +minimumNumberOfCharacters,
                                maxLength: 500,
                            })}
                            // type="text"
                            placeholder={placeholder}
                            onChange={e => {
                                setAnswer(e.target.value);
                            }}
                        />
                    </div>

                    {required && (
                        <p
                            className={`flex flex-wrap leading-[24px] justify-end my-5 text-xs text-white ${
                                answer.length < +minimumNumberOfCharacters && answer !== ""
                                    ? "text-moderate-pink"
                                    : "text-white"
                            }`}
                        >
                            {answer.length > +minimumNumberOfCharacters
                                ? `Maximum number of characters ${500}`
                                : `Minimum number of characters ${minimumNumberOfCharacters}`}
                        </p>
                    )}
                </div>
            </div>
        );
    };
    return (
        <div>
            <h2 className="default-text-29xl text-white leading-[44px] text-center [-webkit-text-stroke:1px_#35d2e2] pb-20">
                TELL US ABOUT YOURSELF
            </h2>

            {/** questions */}
            <form className="md:mx-28 mx-8 ">
                {allowlistQuestions.map((question, i) => (
                    <Input
                        registerKey={question.registerKey}
                        question={question.question}
                        placeholder={question.placeholder}
                        minimumNumberOfCharacters={question.minimumNumberOfCharacters}
                        required={question.required}
                        key={`aQuestion-${i}`}
                    />
                ))}

                <div className="flex justify-center items-center mt-4">
                    <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} onChange={onChange} />
                </div>

                <Button text="Submit" className="my-20" onClick={handleSubmit(onSubmit)} loading={loading} />
            </form>
        </div>
    );
};

export default AllowlistForm;
