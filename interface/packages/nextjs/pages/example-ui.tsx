import Head from "next/head";
import type { NextPage } from "next";
import { ContractData, StartBattle } from "~~/components/example-ui";
import EndBattle from "~~/components/example-ui/EndBattle";
import FreeEntries from "~~/components/example-ui/FreeEntries";
import TestingLayout from "~~/components/layouts/TestingLayout";

const ExampleUI: NextPage = () => {
    return (
        <>
            <Head>
                <title>Example UI | Chain Warz</title>
                {/* We are importing the font this way to lighten the size of SE2. */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
            </Head>
            <TestingLayout>
                <>
                    <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
                        <StartBattle />
                        <EndBattle />
                        <FreeEntries />
                    </div>

                    <div data-theme="exampleUi">
                        <ContractData />
                    </div>
                </>
            </TestingLayout>
        </>
    );
};

export default ExampleUI;
