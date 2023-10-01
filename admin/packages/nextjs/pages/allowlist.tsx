import { useEffect, useState } from "react";
import Image from "next/image";
import db from "../firebase";
import axios from "axios";
import moment from "moment";
import type { NextPage } from "next";
import AdminLayout from "~~/components/layouts/admin-layout";
import AllowlistTableComponent from "~~/components/table/AllowlistTableComponent";
import TableNav from "~~/components/table/TableNav";

interface IAllowlist {
    wlquestions: Record<string, string | number>[];
}

const Allowlist: NextPage<IAllowlist> = ({ wlquestions }) => {
    const [data, setData] = useState<Record<string, string | number>[]>();
    const [change, setChange] = useState(false);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        setData(wlquestions);
    }, []);

    async function searchAndSortByTwitterAndDiscordUsername(searchTerm: string) {
        console.log("searching");
        try {
            const res = await axios.get("/api/searchDB", {
                params: {
                    searchTerm: searchTerm,
                },
            });
            setData(res.data.data);
        } catch (error: any) {
            console.log(error);
        }
    }

    const fetchAllowlistQuestions = async () => {
        try {
            const newLimit = limit + 10;

            setLimit(newLimit);

            const res = await axios.get("/api/fetchAllowlistQuestions", {
                params: {
                    limit: newLimit,
                },
            });
            setData(res.data.data);
        } catch (error: any) {
            console.log(error);
        }
    };

    const download = () => {
        const _data = JSON.stringify(data);
        const file = new Blob([_data], { type: "application/json" });
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = "allowlistResponses-" + Date.now() + ".json";
        document.body.appendChild(element);
        element.click();
    };

    return (
        <AdminLayout>
            <>
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
                        onClick={download}
                    >
                        <Image
                            width={24}
                            height={24}
                            loading="lazy"
                            className="relative w-4 h-4 shrink-0"
                            alt=""
                            src="/download.svg"
                        />
                        <div className="relative text-sm leading-[22px]  font-body-2-12 text-white text-center">
                            Download
                        </div>
                    </button>
                </div>

                <div className="mx-auto rounded-t-8xs rounded-b-none bg-blue w-[894px] h-0.5 default-scale" />

                <TableNav
                    titles={["Twitter Username", "Discord Username", "Submission date", "Wallet Address"]}
                    rowArray={[1, 2, 3, 4, 5]}
                />

                <div className="mx-auto flex flex-col my-2">
                    {data?.map(allowlistData => (
                        <AllowlistTableComponent
                            allowlistData={allowlistData}
                            callback={() => setChange(!change)}
                            key={`AllowlistTableComponent-${allowlistData.walletAddress}`}
                        />
                    ))}
                </div>

                <button className="cw-btn py-4 sm:py-4  px-10 my-20">
                    <div className="text-gradient-tr text-xl " onClick={fetchAllowlistQuestions}>
                        Load More
                    </div>
                </button>
            </>
        </AdminLayout>
    );
};

export default Allowlist;

export async function getServerSideProps() {
    // firebase db
    const allowlistQuestions = await db.collection("allowlist").limit(10).get();

    const wlquestions: Array<any> = await Promise.all(
        allowlistQuestions.docs.map(async question => ({
            ...question.data(),
            timestamp: moment(question.data().timestamp.toDate()).unix(),
        })),
    );

    wlquestions.sort((a, b) => {
        if (a.status === "pending" && b.status === "pending") {
            // Both have pending status, sort by referralPoints
            return b.referralPoints - a.referralPoints;
        } else if (a.status === "pending") {
            // Only a has pending status, it should be higher in the list
            return -1;
        } else if (b.status === "pending") {
            // Only b has pending status, it should be higher in the list
            return 1;
        } else {
            // Neither have pending status, maintain the existing order
            return 0;
        }
    });

    return {
        props: {
            wlquestions,
        },
    };
}
