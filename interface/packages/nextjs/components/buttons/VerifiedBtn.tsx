/* eslint-disable  @typescript-eslint/no-var-requires */
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/solid";
import truncateUsername from "~~/lib/Truncate/truncateUsername";

const VerifiedBtn = ({ username, callback }: { username: string; callback: () => void }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <button className={`primary-gradient-tr btn-shadow rounded-xl py-6 px-[60px] lg:w-[331px] w-[295px]`}>
                <Image
                    width={100}
                    height={100}
                    loading="lazy"
                    className="w-12 h-12 shrink-0 overflow-hidden"
                    alt=""
                    src="/icons/verified.svg"
                />
            </button>
            <div className="flex flex-wrap mx-auto  items-center">
                <p className="lowercase text-13xl">{truncateUsername(username)}</p>
                <TrashIcon className=" ml-3  w-8 h-8 cursor-pointer" onClick={callback} />
            </div>
        </div>
    );
};

export default VerifiedBtn;
