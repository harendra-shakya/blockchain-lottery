import Head from "next/head";
import type { NextPage } from "next";
import BuyFighter from "~~/components/example-ui/BuyFighter";
import ContractData from "~~/components/example-ui/ContractData";
import GasLessBuyFighter from "~~/components/example-ui/GasLessBuyFighter";
import TestingLayout from "~~/components/layouts/TestingLayout";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { Status } from "~~/types/enums";

const Battles: NextPage = () => {
    const gasLessEnabled = useGlobalState(state => state.gasLessEnabled);
    const setGasLessEnabled = useGlobalState(state => state.setGasLessEnabled);

    // @ts-expect-error
    const { data: battles }: { data: BattleStruct[] } = useScaffoldContractRead({
        contractName: "ChainWarzLottery",
        functionName: "getBattles",
    });

    return (
        <>
            <Head>
                <title>Battles</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
            </Head>

            <TestingLayout>
                <>
                    {battles?.length == 0 && <h1 className="flex justify-center text-center text-6xl">No Battles!</h1>}

                    <div className="flex flex-row justify-end items-center bg-white gap-4 px-6">
                        <input
                            type="checkbox"
                            className="toggle toggle-success"
                            onChange={() => {
                                setGasLessEnabled(!gasLessEnabled);
                            }}
                            checked={gasLessEnabled}
                        />

                        <p className="text-black">Gasless</p>
                    </div>

                    {!gasLessEnabled ? (
                        <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
                            {battles?.map(
                                (battle, index) => battle.status == Status.Open && <BuyFighter battleId={index} />,
                            )}
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
                            {battles?.map(
                                (battle, index) =>
                                    battle.status == Status.Open && <GasLessBuyFighter battleId={index} />,
                            )}
                        </div>
                    )}

                    <ContractData />
                </>
            </TestingLayout>
        </>
    );
};

export default Battles;
