import React from "react";
import Image from "next/image";
import moment from "moment";

interface IModal {
    onClose: () => void;
    allowlistData: Record<string, string | number>;
    acceptApplication: () => Promise<void>;
    declineApplication: () => Promise<void>;
}

function Modal({ onClose, allowlistData, acceptApplication, declineApplication }: IModal) {
    const topList = ["reviewer", "status", "referralPoints", "discordUsername", "twitterUsername"];

    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full overflow-auto bg-black bg-opacity-80 font-orbitron justify-center items-center text-center scale-[1]">
            <div className="relative w-full max-w-[1200px] mx-auto my-10 py-10 bg-midnightblue-300 rounded-xl ">
                <Image
                    width={24}
                    height={24}
                    className="absolute top-4 right-4 cursor-pointer w-8 h-8"
                    src="/x.svg"
                    alt="Close"
                    onClick={onClose}
                    loading="lazy"
                />
                <h2 className="mt-12 ml-8  text-gray-100 default-text-29xl ">Answers on questions</h2>
                <div className="mx-8 my-20 space-y-8  items-center justify-start gap-[48px] text-13xl text-white">
                    {Object.entries(allowlistData)
                        .sort((a, b) => b[0].length - a[0].length)
                        .sort(([keyA], [keyB]) => {
                            const indexA = topList.indexOf(keyA);
                            const indexB = topList.indexOf(keyB);

                            if (indexA !== -1 && indexB !== -1) {
                                return indexA - indexB; // sort based on the sequence in topList
                            }
                            if (indexA !== -1) {
                                return -1; // keyA is in topList, prioritize it
                            }
                            if (indexB !== -1) {
                                return 1; // keyB is in topList, prioritize it
                            }
                            return 0; // maintain the relative order for other entries
                        })
                        .map(question => (
                            <div className=" mx-10" key={`modal-${allowlistData.walletAddress}`}>
                                <p className="text-white  items-start justify-start w-[996px] text-left shrink-0 flex flex-row px-6">
                                    {question[0]}
                                </p>
                                <div className="p-4 -mt-8 text-5xl rounded-lg shadow-md">
                                    <p className="text-5xl text-gray-700  border-white border-[1px]  border-gray-100  text-left rounded-lg box-border w-[996px]  shrink-0 flex flex-row py-8 px-6 items-start justify-start  border-solid border-gray-100">
                                        {question[0] == "timestamp"
                                            ? moment.unix(+question[1]).format("DD.MM.YYYY")
                                            : question[1]}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="flex justify-center space-x-8 mb-16 ">
                    <button
                        className="py-6 px-12 bg-lilac cursor-pointer rounded-xl text-white  text-3xl font-orbitron"
                        onClick={() => {
                            acceptApplication();
                            onClose();
                        }}
                    >
                        Approve
                    </button>
                    <button
                        className="py-6 px-12 bg-blue cursor-pointer rounded-xl text-white  text-3xl font-orbitron"
                        onClick={() => {
                            declineApplication();
                            onClose();
                        }}
                    >
                        Deny
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
