import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { ethers } from "ethers";
import type { NextPage } from "next";
import Button from "~~/components/buttons/Button";
import AdminLayout from "~~/components/layouts/admin-layout";
import { getParsedEthersError } from "~~/components/scaffold-eth";
import TableComponent from "~~/components/table/TableComponent";
import TableNav from "~~/components/table/TableNav";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { Status } from "~~/types/enums";
import { notification } from "~~/utils/scaffold-eth";

const ScheduledBattles: NextPage = () => {
    //@ts-expect-error
    const { data: battles }: { data: BattleStruct[] } = useScaffoldContractRead({
        contractName: "ChainWarzLottery",
        functionName: "getBattles",
    });

    const [loading, setLoading] = useState(false);
    const contractName = "ChainWarzLottery";

    const { data: deployedContractData } = useDeployedContractInfo(contractName);
    const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);

    async function searchAndSortByTwitterAndDiscordUsername(searchTerm: string) {
        console.log("searching");
        try {
            await axios.get("/api/searchDB", {
                params: {
                    searchTerm: searchTerm,
                },
            });
        } catch (error: any) {
            console.log(error);
        }
    }

    const SearchBar = () => (
        <div className="flex flex-row justify-between mb-4  w-[894px] default-scale">
            <div className="mx-auto w-[894px]  flex flex-row items-center justify-start gap-[16px] text-sm">
                <Image
                    width={24}
                    height={24}
                    loading="lazy"
                    className="relative w-8 h-8 shrink-0"
                    alt=""
                    src="/magnifyingglass.svg"
                />
                <input
                    className="font-orbitron m-0 h-8 relative bg-inherit text-white"
                    type="text"
                    defaultValue=""
                    placeholder="Search"
                    onChange={e => searchAndSortByTwitterAndDiscordUsername(e.target.value)}
                />
            </div>
            <button
                className="cursor-pointer py-3 px-6 bg-[transparent] mx-auto  rounded-xl box-border  overflow-hidden flex flex-row items-center justify-center gap-[10px] border-[1px] border-solid border-[(255,]"
                // onClick={download}
            >
                <Image
                    width={24}
                    height={24}
                    loading="lazy"
                    className="relative w-4 h-4 shrink-0"
                    alt=""
                    src="/download.svg"
                />
                <div className="relative text-sm leading-[22px]  font-body-2-12 text-white text-center">Download</div>
            </button>
        </div>
    );

    const endBattle = async (battleId: number) => {
        let notificationId: string;

        try {
            setLoading(true);
            notificationId = notification.loading("Mining Your Transaction!");

            const network = "goerli";

            const res = await axios.post("/api/endBattle", {
                network,
                deployedContractData,
                nativeCurrencyPrice,
                // args
                battleId,
            });

            notification.remove(notificationId);

            if (res.status == 200) {
                notification.success("Transaction completed successfully!", {
                    icon: "🎉",
                });
            } else if (res.status == 400) {
                notification.error(`${res.data.error}`);
            } else {
                notification.error("Tx Failed. Server Error");
            }
        } catch (e) {
            notification.error(`${getParsedEthersError(e)}`);
        } finally {
            notification.remove(notificationId!);
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="default-scale">
                <SearchBar />
                <div className="rounded-t-8xs rounded-b-none bg-blue w-[894px] h-0.5" />

                <TableNav
                    key={`battle-nav`}
                    titles={["Battle #", "Prize Pool", "Total fighters", "Battle hash", "start/End DATES", ""]}
                    rowArray={[
                        <p key="Battle #">Battle #544 (Manual)</p>,
                        <p key="Prize Pool">125</p>,
                        <p key="Total fighters">21651</p>,
                        <p key="Battle hash" className="link">
                            0xass4dfa4dsFaf
                        </p>,
                        <p key="start/End DATES">12.2.52</p>,
                        <Button
                            text="End Battle"
                            className="text-xs w-8 h-8 whitespace-nowrap items-center justify-center"
                            key={`endBattle-nav`}
                        />,
                    ]}
                />
                <div className="mx-auto flex flex-col my-2">
                    {battles?.map((battle, index) => (
                        <TableComponent
                            key={`battle-${index}`}
                            rowArray={[
                                <p key="Battle #">Battle #{index} (Manual)</p>,
                                <p key="Prize Pool">{+ethers.utils.formatEther(battle.amountCollected)}</p>,
                                <p key="Total fighters">{+battle.entriesLength}</p>,
                                <p key="Battle hash" className="link">
                                    0xass4dfa4dsFaf
                                </p>,
                                <p key="start/End DATES">12.2.52</p>,
                                <Button
                                    text={`${battle.status == Status.Open ? "End Battle" : "Ended"}`}
                                    className="text-xs w-8 h-8 whitespace-nowrap items-center justify-center"
                                    disabled={battle.status != Status.Open}
                                    onClick={() => endBattle(index)}
                                    loading={loading}
                                    key={`endBattle-${index}`}
                                />,
                            ]}
                        />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default ScheduledBattles;
