import { ReactElement } from "react";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Sidebar from "../sidebar";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";

interface IAdminLayout {
    children: ReactElement<any, any>;
}

const AdminLayout: NextPage<IAdminLayout> = ({ children }) => {
    const { data: session } = useSession();
    const router = useRouter();

    const user: User = session?.user as User;

    console.log(session);

    useEffect(() => {
        if (!session) router.push("/");
    }, [session]);

    return (
        <>
            {true ? (
                <main
                    className="mx-auto bg-black w-full h-full overflow-hidden text-left text-xs text-white font-orbitron"
                    key="allowlist"
                >
                    {" "}
                    <Link href="/">
                        <Image
                            width={200}
                            height={200}
                            loading="lazy"
                            className="flex justify-center my-8 mx-auto cursor-pointer default-scale w-[174px] h-14 overflow-hidden"
                            alt=""
                            src="/chain-warz-main-logo-12.svg"
                        />
                    </Link>
                    <div className="flex flex-row justify-center mx-10 ">
                        <div className="default-scale xl:-mr-0 -mr-20">
                            <Sidebar />
                        </div>

                        <div className="flex flex-col justify-center mx-10">{children}</div>
                    </div>
                </main>
            ) : (
                <div className="flex flex-col justify-center items-center h-screen">
                    <p className="default-text-53xl">You're not an Admin</p>
                    <p className="default-text-21xl">Ask an admin to grant you permissions.</p>
                    <button className="btn default-text-21xl">
                        <div className="text-gradient-tr" onClick={() => signOut()}>
                            Logout
                        </div>
                    </button>
                </div>
            )}
        </>
    );
};

export default AdminLayout;
