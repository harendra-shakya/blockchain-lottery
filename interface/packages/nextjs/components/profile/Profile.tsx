import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatEther } from "../scaffold-eth";
import TableComponent from "../table/TableComponent";
import TableNav from "../table/TableNav";
import moment from "moment";
import type { NextPage } from "next";
import { useDisconnect } from "wagmi";
import { useAccount } from "wagmi";
import Navbar from "~~/components/navbar";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useModal } from "~~/hooks/useModal";
import truncateAddress from "~~/lib/Truncate/truncateAddress";

interface IProfile {
    user: User;
}

const Profile: NextPage<IProfile> = ({ user }) => {
    const [walletHistorySelected, setWalletHistorySelected] = useState(false);
    const [changeUsername, setChangeUsername] = useState(false);

    const { disconnect } = useDisconnect();
    const { openModal } = useModal();
    const { address } = useAccount();

    const { data: balance }: { data: any } = useScaffoldContractRead({
        contractName: "FundManager",
        functionName: "getBalance",
        args: [user.walletAddress],
    });

    const { data: entries } = useScaffoldEventHistory({
        contractName: "ChainWarzLottery",
        eventName: "FightersPurchase",
        fromBlock: 0,
        filters: {
            buyer: user.walletAddress,
        },
    });

    const { data: balanceData } = useScaffoldEventHistory({
        contractName: "FundManager",
        eventName: "BalanceUpdated",
        fromBlock: 0,
        filters: {
            user: user.walletAddress,
        },
    });

    console.log(entries);
    const TABLE_WIDTH = "xl:w-[1200px] w-full";

    const Switch = ({ name, imgName }: { name: string; imgName: string }) => (
        <div className="hidden flex flex-row items-center justify-center gap-[12px]">
            <div className="cursor-pointer  rounded-xl primary-gradient-tr w-[84px] h-[46px] justify-end items-center">
                <div className="scale-[0.7]  bg-white rounded-lg items-center justify-end">
                    <Image
                        width={24}
                        height={24}
                        loading="lazy"
                        className="w-12 h-12 self-center "
                        alt=""
                        src={imgName}
                    />
                </div>
            </div>
            <div className=" leading-[24px] uppercase">{name}</div>
        </div>
    );

    const width = "xl:w-[1199px] lg:w-[950px] md:w-[700px] w-[350px]";

    return (
        <div className="">
            <main
                className={`mx-auto ${width}  flex flex-col items-center justify-center  bg-black h-full text-left text-5xl text-white gap-8 my-20`}
            >
                <Navbar />
                {/* Profile section start*/}
                <div
                    className={`flex lg:flex-row flex-col justify-between items-center mt-20 ${width} mx-auto my-10 gap-10`}
                >
                    <div className="flex md:flex-row flex-col items-center justify-start gap-10">
                        <div className="flex flex-col gap-3">
                            <div className="rounded-3xl bg-moderate-pink w-[180px] h-[181px] overflow-hidden text-center flex flex-col justify-center default-text-21xl">
                                UN
                            </div>

                            <div className="rounded-3xl bg-lightsteelblue-200 box-border w-[180px] h-3.5 overflow-hidden border-[3px] border-solid border-darkturquoise">
                                <div className=" top-[0px] left-[0px] rounded [background:linear-gradient(48.73deg,_#ff817d,_#8233ff_46.35%,_#3857fd_63.02%,_#22def1)] w-[123px] h-2" />
                            </div>
                        </div>

                        {/**info */}
                        <div className="flex flex-col md:items-start items-center">
                            {/* 1 */}
                            <div className="flex flex-row items-start justify-start gap-[8px]">
                                <div className="  leading-[40px] uppercase">{user.username}</div>
                                <img className=" w-8 h-8 overflow-hidden shrink-0" alt="" src="/icons/checkBagde.svg" />
                            </div>

                            {/* 2 */}
                            <div className="flex flex-row items-center justify-start gap-[16px] text-xs text-gray">
                                <p className="hidden link leading-[24px] uppercase text-[inherit] [text-decoration:none]">
                                    u_mail@mail.com
                                </p>
                                <div className=" leading-[24px] uppercase">
                                    {moment.unix(+user.joinDate!).format("DD.MM.YYYY")}
                                </div>
                            </div>

                            {/* 3 */}
                            <div className="flex flex-row items-center justify-start gap-[8px] text-base text-cyan">
                                <div className=" leading-[24px] uppercase">{truncateAddress(user.walletAddress)}</div>
                                <img className=" w-6 h-6 overflow-hidden shrink-0" alt="" src="/icons/arrowLeft.svg" />
                            </div>

                            {/* 4 */}
                            <div className="flex flex-row items-start justify-start gap-[40px] text-xs mt-4">
                                <Switch name="Link Discord" imgName="/icons/discord/discordGradient.svg" />
                                <Switch name="Link Twitter" imgName="/icons/twitter/twitterGradient.svg" />
                            </div>
                        </div>
                    </div>

                    {address == user.walletAddress && (
                        <div className=" top-[160px] right-[360px] flex flex-row items-center justify-end gap-[12px] border-[1px] border-solid border-[#000]">
                            <div className="rounded-xl bg-white hidden flex-row p-4 items-center justify-center">
                                <img className=" w-6 h-6 overflow-hidden shrink-0" alt="" src="/frame-24.svg" />
                            </div>
                            <div className="rounded-xl bg-white hidden flex-row p-4 items-center justify-center">
                                <img className=" w-6 h-6 overflow-hidden shrink-0" alt="" src="/frame-241.svg" />
                            </div>
                            <button className="cursor-pointer [border:none] p-4 bg-white rounded-xl flex flex-row items-center justify-center">
                                <img className=" w-6 h-6 overflow-hidden shrink-0" alt="" src="/icons/share.svg" />
                            </button>
                            <button
                                className="cursor-pointer [border:none] p-4 bg-white rounded-xl flex flex-row items-center justify-center"
                                onClick={() => {
                                    setChangeUsername(true);
                                }}
                            >
                                <img
                                    className=" rounded-lg w-6 h-6 overflow-hidden shrink-0"
                                    alt=""
                                    src="/icons/pencil.svg"
                                />
                            </button>
                            <div className="rounded-xl hidden flex-row p-4 items-center justify-center border-[1px] border-solid border-white">
                                <img className=" w-6 h-6 overflow-hidden shrink-0" alt="" src="/frame6.svg" />
                            </div>
                            <button
                                className="cursor-pointer p-4 bg-[transparent] rounded-xl flex flex-row items-center justify-center border-[1px] border-solid border-white"
                                onClick={() => {
                                    disconnect();
                                }}
                            >
                                <img className=" w-6 h-6 overflow-hidden shrink-0" alt="" src="/icons/exit.svg" />
                            </button>
                        </div>
                    )}

                    {/**info end */}
                </div>

                {/* Profile section end*/}

                {/* Level section start*/}
                <div
                    className={`flex md:flex-row flex-col items-center justify-between  default-text-21xl ${width} mx-auto gap-6`}
                >
                    <div className="flex flex-row items-center justify-start gap-[72px]">
                        <div className="flex flex-col items-start justify-start gap-[8px]">
                            <div className="leading-[32px] uppercase">Level</div>
                            <div className="flex flex-row items-center justify-start gap-[8px]">
                                <img className="w-8 h-8" alt="" src="/icons/star/starYellow.png" />
                                <div className="text-transparent bg-clip-text bg-gradient-to-tr from-[#ffb470] to-[#ffe86c]">
                                    0
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-start justify-start gap-[8px]">
                            <div className="leading-[32px] uppercase">Points</div>
                            <div className="flex flex-row items-center justify-start gap-[8px]">
                                <img className="w-8 h-8" alt="" src="/icons/star/starGreen.png" />
                                <div className="text-cyan">0</div>
                            </div>
                        </div>
                    </div>

                    {address == user.walletAddress && (
                        <div className=" flex flex-col items-end justify-center gap-[8px]">
                            <p className="m-0 leading-[32px] uppercase">Balance</p>
                            <div className="flex flex-row items-center justify-start gap-[8px]  text-cyan">
                                <img
                                    className="w-10 h-10 overflow-hidden shrink-0"
                                    alt=""
                                    src="/icons/eth/ethGradient.svg"
                                />
                                <div className="leading-[48px] uppercase">
                                    {`${balance && (+formatEther(balance)).toFixed(4)} ETH`}
                                </div>
                                <div
                                    className="cursor-pointer rounded-xl bg-midnightblue-200 overflow-hidden items-center p-2 px-4 justify-center text-center text-base text-white"
                                    onClick={() => {
                                        openModal("DepositModal");
                                    }}
                                >
                                    <div className="leading-[24px] uppercase">+</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {/* Level section end*/}

                {/* Options section end*/}
                <div className={`flex md:flex-row flex-col justify-between items-center ${width} mx-auto`}>
                    <div className="flex flex-row items-center justify-start gap-[48px]">
                        <p
                            className={`leading-[32px] uppercase cursor-pointer  ${
                                walletHistorySelected ? "" : "text-cyan border-b-[5px] border-solid border-cyan"
                            }`}
                            onClick={() => setWalletHistorySelected(false)}
                        >
                            Battles Entered
                        </p>

                        <p
                            className={`leading-[32px] uppercase cursor-pointer ${
                                walletHistorySelected ? "text-cyan border-b-[5px] border-solid border-cyan" : ""
                            }`}
                            onClick={() => setWalletHistorySelected(true)}
                        >
                            Wallet History
                        </p>
                    </div>

                    {/* <button className="cursor-pointer py-4 px-6 bg-[transparent] rounded-3xl flex flex-col items-start justify-start gap-[12px] border-[1px] border-solid border-white">
                        <div className="flex flex-row items-center justify-start gap-[13px]">
                            <img className=" w-6 h-6 overflow-hidden shrink-0" alt="" src="/icons--sort-by.svg" />
                            <div className=" text-xs leading-[24px] uppercase font-body-24 text-white text-left inline-block w-[72px] shrink-0">
                                All
                            </div>
                        </div>
                    </button> */}
                </div>
                {/* Options section end*/}

                {!walletHistorySelected ? (
                    <>
                        <TableNav
                            titles={["Battle Id", "", "", "Hash", "Entries"]}
                            classNames={["flex-1", "flex-1", "lg:flex-4 flex-1", "flex-1", "flex-1"]}
                        />

                        <div className="flex flex-col items-center justify-center gap-[16px] text-right text-base">
                            {entries?.map((entry, i) => (
                                <Link href={`/battles/${entry.args[0]}`} className="no-underline">
                                    <TableComponent
                                        rows={[
                                            `Battle #${entry.args[0]}`,
                                            "",
                                            "",
                                            `${truncateAddress(entry.log.transactionHash)}`,
                                            `${entry.args[3]}`,
                                        ]}
                                        key={``}
                                        classNames={[
                                            "flex-1",
                                            "flex-1",
                                            "lg:flex-4 flex-1",
                                            "flex-1 text-cyan",
                                            "flex-1",
                                        ]}
                                        width={TABLE_WIDTH}
                                    />
                                </Link>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className=" flex flex-col items-center justify-center gap-[16px]">
                        {/* Table */}
                        <div className="flex flex-col items-center justify-center gap-[16px] text-right text-base text-cyan">
                            <TableNav
                                titles={["Action", "Amount", "", "Hash", ""]}
                                classNames={["flex-1", "flex-1", "flex-1", "flex-1", "flex-1"]}
                            />

                            {balanceData?.reverse().map((data, i, reversedData) => {
                                console.log("reversedData", i, reversedData);
                                const isDeposit =
                                    i == reversedData.length - 1 || +data.args[1] > +reversedData[i + 1]?.args[1];
                                return (
                                    <TableComponent
                                        rows={[
                                            `${isDeposit ? "Deposit" : "Withdraw"}`,
                                            `${formatEther(data.args[1])} ETH`,
                                            "",
                                            `${truncateAddress(data.log.transactionHash)}`,
                                            ``,
                                        ]}
                                        key={``}
                                        classNames={[
                                            `flex-1 ${isDeposit ? "text-[#3b57ee]" : "text-yellow-200"}`,
                                            "flex-1 text-cyan",
                                            "flex-1 ",
                                            "flex-1 text-cyan",
                                            "flex-1",
                                        ]}
                                        width={TABLE_WIDTH}
                                    />
                                );
                            })}
                        </div>

                        {/* Table */}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Profile;
