import Image from "next/image";
import type { NextPage } from "next";
import AdminLayout from "~~/components/layouts/admin-layout";
import Table from "~~/components/table/Table";

const Winners: NextPage = () => {
    async function searchAndSortByTwitterAndDiscordUsername(searchTerm: string) {
        try {
            console.log(searchTerm);
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
    return (
        <AdminLayout>
            <div className="default-scale">
                <SearchBar />
                <div className="rounded-t-8xs rounded-b-none bg-blue w-[894px] h-0.5" />
                <Table
                    data={["1", "2", "3"]}
                    titles={["Winner", "Participants", "Total fighters", "Battle Hash", "End Date"]}
                    rowArray={[
                        <div key="winner">Alok</div>,
                        <div key="Participants">2165</div>,
                        <div key="Total fighters">21651</div>,
                        <div className="link" key="Battle Hash">
                            0xass4dfa4dsFaf
                        </div>,
                        <div key="End Date">12.2.512</div>,
                    ]}
                    key="winners"
                />
            </div>
        </AdminLayout>
    );
};

export default Winners;
