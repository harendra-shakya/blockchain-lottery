import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";
import { toast } from "~~/utils/scaffold-eth";
import { FC } from "react";

interface IEndBattleComponent {
  battleId: number;
}

const EndBattleComponent: FC<IEndBattleComponent> = ({ battleId }) => {
  const { address } = useAccount();

  const args: number[] = [battleId];

  const { writeAsync, isLoading } = useScaffoldContractWrite("ChainWarzLottery", "endBattle", args);

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
    <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
      <div className="flex flex-col items-center justify-center">
        <input
          type="text"
          placeholder="battleId"
          className="input font-bai-jamjuree w-full px-5 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
          value={`Battle #${battleId}`}
          disabled
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
                End <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndBattleComponent;
