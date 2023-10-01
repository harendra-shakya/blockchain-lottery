import { useState } from "react";
import { FC } from "react";
import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { HareIcon } from "./assets/HareIcon";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { ArrowSmallRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

interface IBuyFighter {
    battleId?: number;
}

const BuyFighter: FC<IBuyFighter> = ({ battleId }) => {
    const [visible, setVisible] = useState(false);
    const { address } = useAccount();

    const [priceId, setPriceId] = useState(0);
    const [collectionAddress, setCollectionAddress] = useState("0x0000000000000000000000000000000000000000");
    const [collectionTokenIdUsed, setCollectionTokenIdUsed] = useState(0);

    // @ts-expect-error
    const { data: prices }: { data: PriceStructure[] } = useScaffoldContractRead({
        contractName: "ChainWarzLottery",
        functionName: "getPrices",
        // @ts-expect-error
        args: [battleId],
    });

    // @ts-expect-error
    const { data: claimData }: { data: ClaimData } = useScaffoldContractRead({
        contractName: "ChainWarzLottery",
        functionName: "getClaimData",
        // @ts-expect-error
        args: [battleId, address],
    });

    const [price, setPrice] = useState("0.008");

    const args: any = [battleId, priceId, collectionAddress, collectionTokenIdUsed];

    const { writeAsync, isLoading } = useScaffoldContractWrite({
        contractName: "ChainWarzLottery",
        functionName: "buyFighter",
        args: args,
        value: price,
    });

    return (
        <div className="flex bg-base-300 relative pb-10">
            <DiamondIcon className="absolute top-24" />
            <CopyIcon className="absolute bottom-0 left-36" />
            <HareIcon className="absolute right-0 bottom-24" />
            <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
                <div className={`mt-10 flex gap-2 ${visible ? "" : "invisible"} max-w-2xl`}>
                    <div className="flex gap-5 bg-base-200 bg-opacity-80 z-0 p-7 rounded-2xl shadow-lg">
                        <span className="text-3xl">👋🏻</span>
                        <div>
                            <div>
                                In this page you can see how some of our <strong>hooks & components</strong> work, and
                                how you can bring them to life with your own design! Have fun and try it out!
                            </div>
                            <div className="mt-2">
                                Check out{" "}
                                <code className="italic bg-base-300 text-base font-bold [word-spacing:-0.5rem]">
                                    packages / nextjs/pages / example-ui.tsx
                                </code>{" "}
                                and its underlying components.
                            </div>
                        </div>
                    </div>
                    <button
                        className="btn btn-circle btn-ghost h-6 w-6 bg-base-200 bg-opacity-80 z-0 min-h-0 drop-shadow-md"
                        onClick={() => setVisible(false)}
                    >
                        <XMarkIcon className="h-4 w-4" />
                    </button>
                </div>
                <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
                    <span className="text-4xl sm:text-6xl text-black">Battle #{battleId}</span>
                    <span className="text-lg sm:text-3xl text-black">
                        Your Entries: {+claimData?.numEntriesPerUser}
                    </span>

                    <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
                        <div className="flex flex-col items-center justify-center">
                            <p className={`${priceId == 0 ? "animate-pulse text-error" : ""}`}>Select One</p>

                            <div className={`flex flex-row gap-4 primary-gradient-r p-[3px] rounded-3xl `}>
                                <div className="flex flex-row gap-4 bg-white rounded-3xl">
                                    <div className="flex flex-col">
                                        <p className="">Price Id</p>
                                        <p className="-mt-4">Price</p>
                                        <p className="-mt-4">Entries</p>
                                    </div>

                                    {prices?.map(price => (
                                        <div
                                            key={price.id}
                                            className={`flex flex-col ${
                                                +price.id == +priceId ? "primary-gradient-r p-[3px] rounded-xl" : ""
                                            }`}
                                            onClick={() => {
                                                setPriceId(+price.id);
                                                setPrice(ethers.utils.formatEther(price.price));
                                            }}
                                        >
                                            <p>{price.id.toString()}</p>
                                            <p className="-mt-4">{ethers.utils.formatEther(price.price)}</p>
                                            <p className="-mt-4">{+price.numEntries}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <p>price</p>
                            <input
                                type="number"
                                placeholder="priceId"
                                className="input font-bai-jamjuree w-full px-5 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
                                value={price}
                                disabled={true}
                            />

                            <p>collectionAddress</p>
                            <input
                                type="text"
                                placeholder="collectionAddress"
                                className="input font-bai-jamjuree w-full px-5 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
                                value={collectionAddress}
                                onChange={e => {
                                    if (!/^0x[a-fA-F0-9]{40}$/.test(e.target.value)) {
                                        notification.error("Incorrect Address!");
                                    }
                                    setCollectionAddress(e.target.value);
                                }}
                            />

                            <p>collectionTokenIdUsed</p>
                            <input
                                type="number"
                                placeholder="collectionTokenIdUsed"
                                className="input font-bai-jamjuree w-full px-5 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
                                value={collectionTokenIdUsed}
                                onChange={e => setCollectionTokenIdUsed(+e.target.value)}
                            />
                        </div>

                        <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
                            <div className="flex rounded-full border-2 border-primary p-1">
                                <button
                                    className={`btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
                                        isLoading ? "loading" : ""
                                    }`}
                                    onClick={() => {
                                        if (priceId == 0) {
                                            notification.error("Please Select A Price Id");
                                            return;
                                        }
                                        writeAsync();
                                    }}
                                >
                                    {!isLoading && (
                                        <>
                                            Send <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* <div className="mt-4 flex gap-2 items-start">
            <span className="text-sm leading-tight">Price:</span>
            <div className="badge badge-warning">0.01 ETH + Gas</div>
          </div> */}
                </div>
            </div>
        </div>
    );
};

export default BuyFighter;
