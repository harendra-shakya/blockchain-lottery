import React from "react";
import { useState } from "react";
import Image from "next/image";
import Button from "../buttons/Button";
import { RainbowKitCustomConnectButton } from "../scaffold-eth";
import { Balance, parseEther } from "../scaffold-eth";
import { useAccount } from "wagmi";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useModal } from "~~/hooks/useModal";
import rgbDataURL from "~~/lib/rgbDataURL";

function DepositEthModal() {
    const { address, isConnected } = useAccount();
    const [withdrawEnabled, setWithdrawEnabled] = useState(false);
    const [value, setValue] = useState("0");

    const { close, isModalOpen } = useModal();

    const { writeAsync: deposit, isLoading: depositing } = useScaffoldContractWrite({
        contractName: "FundManager",
        functionName: "deposit",
        value: value,
    });

    const { writeAsync: withdraw, isLoading: withdrawing } = useScaffoldContractWrite({
        contractName: "FundManager",
        functionName: "withdraw",
        args: [parseEther(value)],
    });

    const increaseValue = () => {
        const newValue = String(Number(value) + 0.1);
        setValue(newValue);
    };

    const decreaseValue = () => {
        const newValue = String(Number(value) - 0.1);
        setValue(newValue);
    };

    return (
        <>
            {isModalOpen("DepositModal") && (
                <div className="fixed  top-0 z-50 w-full h-full flex items-center  justify-center bg-black bg-opacity-80 font-orbitron text-white">
                    <div className="w-full max-w-[588px] bg-midnightblue-300 rounded-13xl text-center mx-4 md:scale-[1] default-scale">
                        {/** Upper start*/}

                        <div className="self-stretch flex flex-row items-start justify-center z-[0] default-text-13xl border-b-[1px] border-solid border-blue">
                            <div
                                className={`flex-1 rounded-t-3xl cursor-pointer rounded-b-none ${
                                    !withdrawEnabled && "bg-blue"
                                } flex flex-row py-6 px-2.5 items-center justify-center`}
                                onClick={() => setWithdrawEnabled(false)}
                            >
                                <div className="relative tracking-[-0.04em] leading-[40px] uppercase">Deposit</div>
                            </div>
                            <div
                                className={`flex-1 flex rounded-t-3xl cursor-pointer flex-row py-6 px-2.5 items-center justify-center ${
                                    withdrawEnabled && "bg-blue"
                                }`}
                                onClick={() => setWithdrawEnabled(true)}
                            >
                                <div className="relative tracking-[-0.04em] leading-[40px] uppercase">withdraw</div>
                            </div>
                        </div>
                        {/** Upper end */}

                        <div className="flex flex-row justify-between">
                            <p></p>
                            <XMarkIcon className="mr-4 mt-2 cursor-pointer md:w-8 w-8" onClick={close} />
                        </div>
                        {/** Balance  start */}
                        <div className="self-stretch flex flex-col pt-8 px-0 pb-0 items-center justify-start gap-[24px] z-[1] default-text-13xl">
                            <div className="self-stretch flex flex-row py-0 px-[102px] items-center justify-between text-left text-base">
                                <div className="relative leading-[24px] uppercase">Your balance</div>

                                <div className="scale-[1.6]">
                                    <Balance address={address} gasLessEnabled={true} />
                                </div>
                            </div>
                        </div>
                        {/** Balance  end */}

                        {/**  start */}
                        <div className="flex flex-col items-center my-10">
                            {!isConnected ? (
                                <div className="scale-[1.3]">
                                    <RainbowKitCustomConnectButton />
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                        {/**  end */}

                        {/**  start */}

                        <div className="flex flex-col items-center justify-start gap-[8px] z-[5] my-8">
                            <div className="relative leading-[24px] uppercase inline-block w-[368px]">
                                How much to deposit?
                            </div>
                            <div className="w-[306px] flex flex-col items-start justify-start gap-[8px] text-left">
                                <div className="self-stretch rounded-2xl flex flex-row p-2 items-center justify-between text-center text-5xl border-[1px] border-solid border-lightsteelblue-100">
                                    <div
                                        className="cursor-pointer rounded-xl bg-mediumslateblue-100 overflow-hidden flex flex-row py-4 px-6 items-center justify-center"
                                        onClick={decreaseValue}
                                    >
                                        <div className="relative tracking-[-0.04em] leading-[32px] uppercase [background:linear-gradient(48.73deg,_#ff817d,_#8233ff_46.35%,_#3857fd_63.02%,_#22def1)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                                            -
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center justify-start gap-[1px] text-left">
                                        <Image
                                            width={24}
                                            height={24}
                                            loading="lazy"
                                            className="w-10 h-10"
                                            alt=""
                                            src={`/icons/eth/ethGradient.svg`}
                                            placeholder="blur"
                                            blurDataURL={rgbDataURL(130, 51, 255)}
                                        />
                                        <input
                                            className="input md:w-[100px] w-[90px] rounded-none bg-inherit text-white"
                                            type="number"
                                            value={value}
                                            placeholder="0.1"
                                            onChange={event => setValue(event?.target?.value ?? "")}
                                        />
                                    </div>
                                    <button
                                        className="cursor-pointer [border:none] py-4 px-6 bg-mediumslateblue-100 rounded-xl overflow-hidden flex flex-row items-center justify-center"
                                        onClick={increaseValue}
                                    >
                                        <div className="relative text-5xl tracking-[-0.04em] leading-[32px] uppercase font-body-24 [background:linear-gradient(48.73deg,_#ff817d,_#8233ff_46.35%,_#3857fd_63.02%,_#22def1)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] text-center">
                                            +
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/**  end */}

                        {/**  start */}
                        <Button
                            text={`${!withdrawEnabled ? "deposit" : "Withdraw"}`}
                            className="default-text-13xl my-10"
                            onClick={() => {
                                !withdrawEnabled ? deposit() : withdraw();
                            }}
                            loading={depositing || withdrawing}
                        />
                        {/**  end */}
                    </div>
                </div>
            )}
        </>
    );
}

export default DepositEthModal;
