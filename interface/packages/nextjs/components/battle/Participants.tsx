import { useState } from "react";
import Blockies from "react-blockies";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
import truncateAddress from "~~/lib/Truncate/truncateAddress";

const Participants = ({ battleId }: { battleId?: number }) => {
    const [hidden, setHidden] = useState(false);
    const { data: entries } = useScaffoldEventHistory({
        contractName: "ChainWarzLottery",
        eventName: "FightersPurchase",
        fromBlock: 0,
    });

    console.log(battleId);

    return (
        <div className="relative max-h-[550px] overflow-y-auto  overflow-hidden md:w-[486px] text-left">
            <div
                className="flex flex-col gap-3 cursor-pointer"
                onClick={() => {
                    setHidden(!hidden);
                }}
            >
                <div className="flex flex-row justify-between leading-[32px] uppercase text-5xl ">
                    <div className="flex flex-row justify-start items-center">
                        <span>{`Battle participants `}</span>
                        <span className="text-gray">{`(${entries?.length}) `}</span>
                    </div>
                    {!hidden ? (
                        <ChevronUpIcon className="w-7 h-7 fill-blue stroke-blue stroke-2" />
                    ) : (
                        <ChevronDownIcon className="w-7 h-7 fill-blue stroke-blue stroke-2" />
                    )}
                </div>

                <div className="rounded-t-8xs rounded-b-none bg-blue md:w-[486px] h-[5px]" />
            </div>

            {!hidden && (
                <div className="flex flex-col items-start justify-start text-base">
                    {entries?.map((entry, i) => (
                        <Participant name={truncateAddress(entry.args[1])} entries={+entry.args[3]} key={i} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Participants;

const Participant = ({ name, img, entries }: { name: string; img?: string; entries?: number }) => {
    return (
        <div className="box-bordmd:er md:w-[4md:64px] flex flex-row py-4 px-0 items-center justify-start gap-[133px] border-b-[1px] border-solid border-midnightblue-300">
            <div className="flex flex-row items-center justify-start gap-[16px]">
                <Blockies
                    className="rounded-full stroke-white border-[2.5px] border-solid border-white"
                    seed={img?.toLowerCase() as string}
                    scale={5.5}
                />

                <div className="flex flex-col items-start justify-start">
                    <div className="flex flex-row items-start justify-start">
                        <div className="relative leading-[24px] uppercase inline-block w-[88px] shrink-0">{name}</div>
                        <img className="relative w-6 h-6 object-cover hidden" alt="" src="/victorycup.png" />
                    </div>
                    <div className="relative leading-[24px] uppercase text-gray ">{`${entries} entries`}</div>
                </div>
            </div>
            <div className="hidden flex-row items-center justify-end gap-[4px] text-cyan">
                <div className="relative leading-[24px] uppercase">3 hours ago</div>
                <img className="relative w-6 h-6 overflow-hidden shrink-0" alt="" src="/icons--arrow-go.svg" />
            </div>
        </div>
    );
};
