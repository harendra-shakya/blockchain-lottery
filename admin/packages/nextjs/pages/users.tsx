import Image from "next/image";
import axios from "axios";
import type { NextPage } from "next";
import AdminLayout from "~~/components/layouts/admin-layout";
import Table from "~~/components/table/Table";

const Users: NextPage = () => {
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

    return (
        <AdminLayout>
            <div className="default-scale">
                <SearchBar />
                <div className="rounded-t-8xs rounded-b-none bg-blue w-[894px] h-0.5" />

                {/* <div className="absolute top-[892px] left-[929px] flex flex-row items-start justify-start gap-[16px] text-center text-xs">
                    <div className="rounded-lg flex flex-row p-3 items-center justify-start opacity-[0.4] border-[1px] border-solid border-gray">
                        <img className="relative w-6 h-6 shrink-0 overflow-hidden" alt="" src="/left.svg" />
                    </div>
                    <div className="rounded-lg w-12 shrink-0 flex flex-row p-3 box-border items-center justify-center">
                        <div className="relative leading-[24px] uppercase [background:linear-gradient(48.73deg,_#ff817d,_#8233ff_46.35%,_#3857fd_63.02%,_#22def1)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                            1
                        </div>
                    </div>
                    <div className="rounded-lg box-border w-12 shrink-0 flex flex-row p-3 items-center justify-center border-[1px] border-solid border-gray">
                        <div className="relative leading-[24px] uppercase">2</div>
                    </div>
                    <div className="rounded-lg box-border w-12 shrink-0 flex flex-row p-3 items-center justify-center border-[1px] border-solid border-gray">
                        <div className="relative leading-[24px] uppercase">3</div>
                    </div>
                    <div className="rounded-lg box-border w-12 shrink-0 flex flex-row p-3 items-center justify-center border-[1px] border-solid border-gray">
                        <div className="relative leading-[24px] uppercase">4</div>
                    </div>
                    <div className="rounded-lg flex flex-row p-3 items-center justify-start border-[1px] border-solid border-gray">
                        <img className="relative w-6 h-6 shrink-0 overflow-hidden" alt="" src="/right.svg" />
                    </div>
                </div> */}
                <Table
                    data={["1", "2", "3"]}
                    titles={["User Name", "WalletAddress", "Eth Won", "User role", "User Email"]}
                    rowArray={[
                        <p className="" key="username">
                            Arlene McCoy
                        </p>,
                        <p className="link" key="walletaddress">
                            0x0000....0000
                        </p>,
                        <p key="eth won">143</p>,
                        <div className="rounded-md bg-mediumslateblue-300 w-[57px] p-1 box-border" key="user-role">
                            Admin
                        </div>,
                        <p className="link" key="user-email">
                            chainwarz12312@gmai.com
                        </p>,

                        <button
                            className="bg-[transparent] text-white leading-[18px] rounded-md box-border w-[61px] p-1 items-center justify-center text-center text-xs border-[1px] border-solid border-[rgba(255,]"
                            key="block-button"
                        >
                            Block
                        </button>,
                    ]}
                    key="users"
                />
            </div>
        </AdminLayout>
    );
};

export default Users;
