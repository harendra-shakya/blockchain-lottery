import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { Meta } from "~~/components/Meta";
import Battle from "~~/components/battle/Battle";
import BattleEnded from "~~/components/battle/BattleEnded";
import MainLayout from "~~/components/layouts/MainLayout";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { Status } from "~~/types/enums";

const BattlePage: NextPage = () => {
    const router = useRouter();
    const { battleId } = router.query;
    const [showMessage, setShowMessage] = useState(false);

    // @ts-expect-error
    const { data: battle }: { data: BattleStruct } = useScaffoldContractRead({
        contractName: "ChainWarzLottery",
        functionName: "getBattle",
        // @ts-expect-error
        args: [battleId],
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMessage(true);
        }, 1500);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <MainLayout>
            <>
                {battle?.status == Status.Open ? (
                    <Battle battleId={battleId?.toString()!} />
                ) : battle?.status == Status.Close ? (
                    <BattleEnded battleId={battleId?.toString()!} />
                ) : (
                    <>
                        <Meta
                            title={"No Battle Found"}
                            description={"No Battle Found"}
                            imageUrl="https://chainwarz.io/chainwarzMetaLogo.jpg"
                            noIndex={true}
                        />
                        <div className="flex flex-col text-center justify-center items-center w-full h-full text-white font-orbitron mx-auto gap-8 2xl:scale-[1] scale-[.90]">
                            <h1 className="mt-40 default-text-53xl">{showMessage && "No Battle Found"}</h1>
                        </div>
                    </>
                )}
            </>
        </MainLayout>
    );
};

export default BattlePage;
