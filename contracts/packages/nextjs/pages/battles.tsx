import type { NextPage } from "next";
import Head from "next/head";
import BuyFighter from "~~/components/ExampleUi/BuyFighter";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { ContractData } from "~~/components/ExampleUi";
import { Status } from "~~/types/enums";
import GasLessBuyFighter from "~~/components/ExampleUi/GasLessBuyFighter";
import { useState } from "react";

const Battles: NextPage = () => {
  const [gasLessEnabled, setGasLessEnabled] = useState(false);
  // @ts-expect-error
  const { data: battles }: { data: BattleStruct[] } = useScaffoldContractRead("ChainWarzLottery", "getBattles");

  return (
    <>
      <Head>
        <title>Battles</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </Head>

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
          {battles?.map((battle, index) => battle.status == Status.Open && <BuyFighter battleId={index} />)}
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
          {battles?.map((battle, index) => battle.status == Status.Open && <GasLessBuyFighter battleId={index} />)}
        </div>
      )}

      <ContractData />
    </>
  );
};

export default Battles;
