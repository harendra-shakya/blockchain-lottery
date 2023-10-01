import BlueContainer from "../BlueContainer";
import SectionContainer from "../SectionContainer";
import type { NextPage } from "next";

const About: NextPage = () => {
    return (
        <SectionContainer id="about-us">
            <BlueContainer>
                <div className="mx-auto flex flex-col items-center lg:my-36 md:my-24 my-16">
                    <h2 className="mt-0 h-shadow default-text-77xl default-tracking md:leading-[104px] uppercase text-center ">
                        About Chainwarz
                    </h2>
                    <div className="mx-6 lg:mx-48 flex flex-col text-left md:text-center ">
                        <div className="flex flex-col hidden lg:flex-row gap-[16px] text-53xl items-center justify-center">
                            <p className="default-text-53xl text-gradient-br leading-[80px] md:leading-[80px]">
                                1K supply
                            </p>
                            <p className="text-29xl default-tracking leading-[56px] uppercase inline-block md:w-[486px] md:whitespace-nowrap lg:mt-12 -mt-8">
                                FOUNDERS NFT PASS
                            </p>
                        </div>
                        <div className="text-5xl default-tracking leading-[32px] inline-block w-full items-center">
                            <p>
                                Welcome to Chain Warz, the ultimate decentralized, gamified sweepstakes lottery platform
                                that will leave you breathless. Prepare to embark on a thrilling journey through a
                                captivating dystopian world.
                            </p>
                            <p>
                                At Chain Warz, we've assembled a diverse and seasoned team of nine experts (including AI
                                as an advisor), each bringing their unique expertise to the table. With backgrounds in
                                web3, web2, cybersecurity, Discord moderation, Twitter advertising, NFTs, and DeFi,
                                we're a force to be reckoned with. Together, we've harnessed our exceptional skills to
                                create the next groundbreaking phenomenon: DeLo, the decentralized Lottery. And we did
                                it all during the harshest bear market, proving that we're fearless and unstoppable.
                            </p>
                            <p>
                                Proudly built on the Ethereum blockchain, Chain Warz employs cutting-edge technology to
                                ensure fairness and transparency in every game. By utilizing the revolutionary provably
                                fair RNG technology, supported by Chainlink VRF on the blockchain, we guarantee a secure
                                and trustworthy gaming experience. Rest assured, our smart contracts have been audited
                                by the esteemed company Certik, giving you peace of mind.
                            </p>
                            <p>
                                Witness relentless robot fighters facing off against unpredictable challenges, putting
                                your luck to the test. But that's just the beginning. Our vision includes introducing a
                                skill-based element to these battles, taking the excitement to a whole new level.
                            </p>
                            <p>
                                We're not just building a platform; we're fostering a dynamic and engaged community.
                                Join us on this thrilling journey. Become part of our vibrant community and cheer on
                                your favorite robot fighters as they strive for victory.
                            </p>
                            <p>
                                The launch of Chain Warz is right around the corner, and we couldn't be more thrilled to
                                have you on board. Let's embark on this extraordinary adventure together. Engage, play,
                                and let's create something truly remarkable! Don't miss out on the opportunity to be a
                                part of history in the making.
                            </p>
                            <p>!BATTLE</p>
                        </div>
                    </div>
                </div>
            </BlueContainer>
        </SectionContainer>
    );
};

export default About;
