import type { NextPage } from "next";
import Head from "next/head";
import { ContractData, StartBattle } from "~~/components/ExampleUi";
import EndBattle from "~~/components/ExampleUi/EndBattle";
import { toast } from "~~/utils/scaffold-eth";
import FreeEntries from "~~/components/ExampleUi/FreeEntries";

const ExampleUI: NextPage = () => {
  return (
    <>
      <Head>
        <title>Admin/Operator</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </Head>
      <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
        <StartBattle />
        <EndBattle />
        <FreeEntries />
      </div>

      <div data-theme="exampleUi">
        <ContractData />
      </div>

      <div
        onClick={() => {
          toast.success("Found Something!");
          toast.error("Found Something!");
          toast.warning("Found Something!");
        }}
      >
        Notification
      </div>
    </>
  );
};

export default ExampleUI;
