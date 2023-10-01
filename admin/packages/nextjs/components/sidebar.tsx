import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { signOut } from "next-auth/react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";

const AllowlistNav: NextPage = () => {
    const Bar = ({ imgName, name, page }: { imgName: string; name: string; page: string }) => {
        return (
            <Link
                href={`/${page}`}
                className={`relative text-white no-underline flex flex-row justify-center items-center rounded-lg  box-border w-[282px] h-[52px] shrink-0 overflow-hidden border-[1px] border-solid border-mediumslateblue-300 cursor-pointer ${
                    typeof window !== "undefined" && window?.location?.href?.includes(page)
                        ? "bg-[#752ce8]"
                        : "bg-[#1d144b]"
                }`}
            >
                <div className={`rounded  flex flex-row p-1 items-center justify-center`}>
                    <Image
                        loading="lazy"
                        width={24}
                        height={24}
                        className={`relative  w-5 h-5 shrink-0  ${
                            typeof window !== "undefined" && window?.location?.href?.includes(page)
                                ? "bg-[#752ce8]"
                                : "bg-[#1d144b]"
                        }`}
                        alt=""
                        src={`/${imgName}.svg`}
                    />
                </div>
                <div className="  leading-[20px]  inline-block w-[216px]">{name}</div>
            </Link>
        );
    };

    return (
        <div className="justify-center  top-[96px] left-[360px] flex flex-col items-center gap-[4px] text-left text-sm text-white font-orbitron">
            <div className="flex flex-row items-center justify-start gap-4 cursor-pointer" onClick={() => signOut()}>
                <p>Log out</p>
                <ArrowLeftOnRectangleIcon className="w-6 h-6" />
            </div>
            <Bar imgName="squaresfour" name="Dashboard" page="dashboard" />
            <Bar imgName="sword" name="Create Battle" page="create-battle" />
            <Bar imgName="listnumbers" name="Winners" page="winners" />
            <Bar imgName="pencil" name="Scheduled Battles" page="scheduled-battles" />
            <Bar imgName="users4" name="User Management" page="users" />
            <Bar imgName="users4" name="Allowlist" page="allowlist" />
        </div>
    );
};

export default AllowlistNav;
