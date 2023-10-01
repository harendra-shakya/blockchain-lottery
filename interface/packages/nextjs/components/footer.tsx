import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";

const Footer: NextPage = () => {
    return (
        <footer className="bg-black w-full max-w-screen h-full  overflow-x-hidden text-center text-base text-white font-orbitron">
            <div className="mx-auto  flex flex-col items-center justify-start gap-8 text-77xl">
                <h2 className="m-0 h-shadow mt-20 text-29xl  md:text-53xl lg:text-77xl leading-[104px]">JOIN US!</h2>
                <p className="mx-auto text-5xl  leading-[32px]  text-gray inline-block w-[343px] md:w-[476px]">
                    Join our Chain Warz community to stay updated on the latest and greatest battles in blockchain and
                    participate in the action.
                </p>
                <div className="flex flex-row items-start justify-start gap-[24px]">
                    <Link href={"https://twitter.com/harendrashakya_"} target="_blank">
                        <button className="cursor-pointer p-10 bg-black rounded-xl flex flex-row items-center justify-center border-[1px] border-solid border-gray hover:opacity-[0.85]">
                            <Image
                                width={24}
                                height={24}
                                className=" w-8 h-8"
                                alt="Chainwarz Twitter"
                                src="/icons/twitter/twitterWhite.svg"
                                loading="lazy"
                            />
                        </button>
                    </Link>

                    <Link href={"https://twitter.com/harendrashakya_"} target="_blank">
                        <button className="cursor-pointer p-10 bg-black rounded-xl flex flex-row items-center justify-center border-[1px] border-solid border-gray hover:opacity-[0.85]">
                            <Image
                                width={24}
                                height={24}
                                className=" w-8 h-8"
                                alt="Chainwarz Discord"
                                src="/icons/discord/discordWhite.svg"
                                loading="lazy"
                            />
                        </button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-[24px] my-10 ">
                <p className="m-0 leading-[24px] hover:opacity-[0.85] ">
                    <Link href="/terms-and-conditions" className="text-white no-underline">
                        Terms & conditions
                    </Link>
                </p>
                <p className="m-0 leading-[24px] hover:opacity-[0.85]">
                    <Link href="/privacy-policy" className="text-white no-underline">
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
