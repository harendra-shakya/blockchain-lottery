import prizePool from "../../public/images/prizePool.png";
import purchaseFighter from "../../public/images/purchaseFighter.png";
import vsBot from "../../public/images/vsBot.jpg";
import SectionContainer from "../SectionContainer";
import Step from "./step";
import type { NextPage } from "next";

const HowItWorks: NextPage = () => {
    return (
        <SectionContainer id="how-it-works">
            <div className="default-scale default-my -mt-20 ">
                <h2
                    className="default-text-77xl default-tracking leading-[60px] sm:leading-[150px] md:leading-[110px] uppercase  md:mb-40 h-shadow
      "
                >
                    How It Works
                </h2>
                <div className="xl:ml-40">
                    <Step img={vsBot} num="1" text="Join Battle" alt="Join Battle" />
                    <Step img={purchaseFighter} num="2" text="Purchase Fighters" alt="Purchase Fighters" />
                    <Step img={prizePool} num="3" text="LAST ONE STANDING TAKES ALL" alt="Prize Pool" />
                </div>
            </div>
        </SectionContainer>
    );
};

export default HowItWorks;
