import { useEffect } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Allowlist: NextPage = () => {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) router.push("/dashboard");
    }, [session]);

    return (
        <div className=" ">
            {!session ? (
                <main className="mx-auto flex flex-col items-center  w-full h-full  pb-20">
                    <p className="m-0 mt-40 default-text-77xl leading-[104px] uppercase text-white h-shadow pb-20">
                        Login
                    </p>

                    {/** container */}
                    <div className="rounded-13xl  bg-mediumslateblue-200 py-14 px-12 ">
                        <button
                            className="cw-btn"
                            onClick={() => {
                                console.log("sign");
                                !session ? signIn("google") : signOut();
                            }}
                        >
                            <p className="m-0  text-13xl text-gradient-tr">Google</p>
                        </button>
                    </div>
                </main>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Allowlist;
