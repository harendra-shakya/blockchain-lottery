import React from "react";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface IModal {
    onClose: () => void;
}

function DiscordAlertModal({ onClose }: IModal) {
    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-80 font-orbitron ">
            <div className="w-full max-w-[1200px] my-10 py-10 bg-midnightblue-300 rounded-3xl text-center mx-4">
                <div className="flex flex-row justify-between">
                    <p></p>
                    <XMarkIcon className="mr-8 cursor-pointer w-10 h-10" onClick={onClose} />
                </div>

                <h2 className="text-gray-100 default-text-29xl md:mx-20">
                    You need to be in our{" "}
                    <Link href="https://twitter.com/harendrashakya_" target="_blank" className="text-white">
                        Discord
                    </Link>{" "}
                    to be a part of allowlist
                </h2>

                <div className="flex justify-center space-x-8 mb-8 ">
                    <button
                        className="py-6 px-12 bg-lilac cursor-pointer rounded-xl text-white  text-3xl font-orbitron"
                        onClick={() => {
                            window.open("https://twitter.com/harendrashakya_");
                            onClose();
                        }}
                    >
                        Join Discord
                    </button>
                    <button
                        className="py-6 px-12 bg-blue cursor-pointer rounded-xl text-white  text-3xl font-orbitron"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DiscordAlertModal;
