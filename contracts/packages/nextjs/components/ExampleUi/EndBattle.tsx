import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { HareIcon } from "./assets/HareIcon";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";
import EndBattleComponent from "./EndBattleComponent";
import { Status } from "~~/types/enums";

export default function EndBattle() {
  const [visible, setVisible] = useState(false);
  const { address } = useAccount();

  const { data: battles }: { data: BattleStruct[] } = useScaffoldContractRead("ChainWarzLottery", "getBattles");

  const [battleId, setBattleId] = useState(0);

  const args: number[] = [battleId];

  const { data: operator }: { data: string } = useScaffoldContractRead("ChainWarzLottery", "operatorAddress");

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
          <span className="text-4xl sm:text-6xl text-black">End Battle</span>

          <span className="text-lg sm:text-3xl font-semibold text-red-600">
            {operator != address && "You're not the Operator"}
          </span>
          <span className="text-lg sm:text-3xl text-black">The Operator is: {truncateEthAddress(operator)}</span>

          {battles?.map((battle, index) => battle.status == Status.Open && <EndBattleComponent battleId={index} />)}
        </div>
      </div>
    </div>
  );
}
