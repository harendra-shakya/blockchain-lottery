import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { HareIcon } from "./assets/HareIcon";
import { ArrowSmallRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useScaffoldContractWrite, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { BigNumber, ethers } from "ethers";
import { useAccount } from "wagmi";
import { toast } from "~~/utils/scaffold-eth";

interface PriceStructure {
  id: number;
  numEntries: number;
  price: BigNumber;
}

export default function StartBattle() {
  const [visible, setVisible] = useState(false);
  const { address } = useAccount();

  function truncateEthAddress(address: string): string {
    if (!address) return address;
    const prefixLength = 6; // Length of the prefix to keep
    const suffixLength = 4; // Length of the suffix to keep

    // Check if the input address is valid
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      throw new Error("Invalid Ethereum address");
    }

    const prefix = address.slice(0, prefixLength);
    const suffix = address.slice(-suffixLength);

    return `${prefix}....${suffix}`;
  }

  const [maxEntries, setMaxEntries] = useState(0);
  const [prices, setPrices] = useState<PriceStructure[]>([
    {
      id: 1,
      numEntries: 10,
      price: ethers.utils.parseEther("0.008"),
    },
    {
      id: 2,
      numEntries: 20,
      price: ethers.utils.parseEther("0.01"),
    },
    {
      id: 3,
      numEntries: 30,
      price: ethers.utils.parseEther("0.05"),
    },
    {
      id: 4,
      numEntries: 40,
      price: ethers.utils.parseEther("0.08"),
    },
    {
      id: 5,
      numEntries: 400,
      price: ethers.utils.parseEther("0.1"),
    },
  ]);
  const [treasuryFeeInBps, setTreasuryFeeInBps] = useState(500);
  const [weeklyJackpotBattleBps, setWeeklyJackpotBattleBps] = useState(500);
  const [nftCollectionWhitelist, setNftCollectionWhitelist] = useState([]);
  const [IsJackpotBattle, setIsJackpotBattle] = useState(false);

  const args: (boolean | number | string | string[] | PriceStructure[])[] = [
    maxEntries,
    prices,
    treasuryFeeInBps,
    weeklyJackpotBattleBps,
    nftCollectionWhitelist,
    IsJackpotBattle,
  ];

  const { writeAsync, isLoading } = useScaffoldContractWrite("ChainWarzLottery", "startBattle", args, undefined);

  const { data: operator }: { data: string } = useScaffoldContractRead("ChainWarzLottery", "operatorAddress");

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
                In this page you can see how some of our <strong>hooks & components</strong> work, and how you can bring
                them to life with your own design! Have fun and try it out!
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
          <span className="text-4xl sm:text-6xl text-black">Start Battle</span>

          <span className="text-lg sm:text-3xl font-semibold text-red-600">
            {operator != address && "You're not the Operator"}
          </span>
          <span className="text-lg sm:text-3xl text-black">The Operator is: {truncateEthAddress(operator)}</span>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <div className="flex flex-col items-center justify-center">
              <p>maxEntries</p>
              <input
                type="number"
                placeholder="maxEntries"
                className="input font-bai-jamjuree w-full px-5 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
                value={0}
                onChange={e => setMaxEntries(+e.target.value)}
              />

              <p>prices</p>
              <input
                type="text"
                placeholder="prices"
                className="input font-bai-jamjuree w-full px-5 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
                value={JSON.stringify(prices)}
                // onChange={e => setPrices(e.target.value)}
              />

              <p>treasuryFeeInBps</p>
              <input
                type="text"
                placeholder="treasuryFeeInBps"
                className="input font-bai-jamjuree w-full px-5 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
                value={treasuryFeeInBps}
                onChange={e => setTreasuryFeeInBps(+e.target.value)}
              />

              <p>weeklyJackpotBattleInBps</p>
              <input
                type="text"
                placeholder="weeklyJackpotBattleInBps"
                className="input font-bai-jamjuree w-full px-5 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
                value={weeklyJackpotBattleBps}
                onChange={e => setWeeklyJackpotBattleBps(+e.target.value)}
              />

              <p>nftCollectionWhitelist</p>
              <input
                type="text"
                placeholder="nftCollectionWhitelist"
                className="input font-bai-jamjuree w-full px-5 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
                value={nftCollectionWhitelist}
              />

              <p>isJackpotBattle</p>
              <input
                type="boolean"
                placeholder="isJackpotBattle"
                className="input font-bai-jamjuree w-full px-5 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
                value={IsJackpotBattle.toString()}
              />
            </div>

            <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className={`btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
                    isLoading ? "loading" : ""
                  }`}
                  onClick={() => {
                    if (operator != address) {
                      toast.error("You're not Operator");
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
}
