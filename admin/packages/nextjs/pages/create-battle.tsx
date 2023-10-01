import type { NextPage } from "next";
import AdminLayout from "~~/components/layouts/admin-layout";
import ManualBattle from "~~/components/manual-battle";

const Battle: NextPage = () => {
    return (
        <AdminLayout>
            <>
                {/* <div className="absolute top-[96px] left-[666px] w-[182px] h-9 ">
                    <div className="absolute top-[0px] left-[0px] leading-[24px] uppercase">Manual</div>
                    <div className="absolute top-[0px] left-[84px] leading-[24px] uppercase text-white">automatic</div>
                    <img
                        className="absolute top-[35px] left-[0px] w-[182px] h-px"
                        alt=""
                        src="/group-10000013681.svg"
                    />
                </div> */}

                <ManualBattle />
            </>
        </AdminLayout>
    );
};

export default Battle;
