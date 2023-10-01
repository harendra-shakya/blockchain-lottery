import dynamic from "next/dynamic";
import Link from "next/link";
import FrontBots from "../components/landing-page/front-bots";
import type { NextPage } from "next";
import { Meta } from "~~/components/Meta";
import SectionContainer from "~~/components/SectionContainer";
import Button from "~~/components/buttons/Button";
import MainLayout from "~~/components/layouts/MainLayout";

const HowItWorks = dynamic(() => import("../components/landing-page/how-it-works"), {
    ssr: false,
});
const About = dynamic(() => import("../components/landing-page/about"), { ssr: false });
const Subscribe = dynamic(() => import("../components/landing-page/subscribe"), { ssr: false });
const FAQS = dynamic(() => import("../components/landing-page/faqs"), { ssr: false });

const Home: NextPage = () => {
    return (
        <div>
            <Meta
                title={
                    "Chain Warz | Licensed, Decentralized, Gamified, Gasless - Dive into the Crypto Lottery Revolution"
                }
                description={
                    "Experience the licensed and exhilarating gasless platform that brings you decentralized, gamified lottery experiences on the blockchain. With our Chainlink-powered technology and Certik audited security, immerse yourself in a captivating world where battles ignite and fortunes await. Join us today and become a part of the thrilling crypto lottery revolution. Get ready to engage, play, and seize your chance to win big! Don't miss out - start your journey with us now! !battle"
                }
                imageUrl="https://chainwarz.io/chainwarzMetaLogo.jpg"
                url="https://chainwarz.io"
            />

            <MainLayout>
                <>
                    <SectionContainer className="bg-gradient">
                        <div className="default-scale">
                            {/* <Image
                        width={100}
                        height={100}
                        className="absolute 3xl:top-[157px] 3xl:left-[363px] 2xl:top-[167px] 2xl:left-[325px] xl:top-[157px] xl:left-[225px] lg:top-[287px] lg:left-[125px]  lg:scale-[1]   md:scale-[0.75] top-[-100px] left-[-340px]  scale-[0.5] w-[1075px] h-[1075px] opacity-[.9] hidden lg:block"
                        alt=""
                        src="/ellipse-1.svg"
                        priority={true}
                    /> */}

                            <p className="mt-24 pb-4 md:pb-0 default-text-21xl  leading-[60px] sm:leading-[90px] md:leading-[120px] uppercase h-shadow font-bold">
                                WELCOME TO
                            </p>

                            <h1 className="relative default-text-161xl leading-[80px] sm:leading-[150px] md:leading-[120px] lg:leading-[160px] uppercase -mt-12 pb-20 md:pb-10 2xl:pb-0 lg:whitespace-nowrap h-shadow">
                                CHAIN WARZ
                            </h1>

                            {/**
            //normal
            <div className="mx-auto sm:ml-auto sm:mr-auto -mt-32 h-auto 3xl:w-[840px] lg:w-[780px] md:w-[740px] pt-20 xs:w-[640px] xs:h-[335px]">

             */}
                            <div className="mx-auto md:-mt-80 md:pb-16 pb-6 h-auto 2xl:w-[940px] lg:w-[780px] md:w-[740px] pt-20 xs:w-[640px] xs:h-[335px] max-w-full md:-mb-0 -mb-[370px] -mt-[210px]">
                                <FrontBots />
                            </div>
                            <p className="default-text-21xl md:mt-8 mt-36 leading-[48px] uppercase md:inline-block hidden w-full max-w-[996px] stroke text-center relative">
                                The ultimate blockchain battle, Where you have a chance to win big!
                            </p>

                            <Link href="/battles" className={`no-underline`}>
                                <Button text="join battle" className="relative sm:-mt-2 mt-36" />
                            </Link>
                        </div>
                    </SectionContainer>
                    <HowItWorks />
                    <About />
                    <Subscribe />
                    <FAQS />
                </>
            </MainLayout>
        </div>
    );
};

export default Home;
