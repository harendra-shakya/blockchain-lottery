import TeamCard from "./team-card";
import type { NextPage } from "next";

const TeamCards: NextPage = ({}) => {
    return (
        <div className=" bg-black max-w-screen shrink-0 overflow-hidden h-full w-full">
            <div className="default-my">
                <h2 className="text-29xl sm:text-53xl lg:text-77xl lg:leading-[104px]  text-center  default-tracking leading-[104px] uppercase">
                    the Team
                </h2>
                <div className="mx-auto 2xl:mx-60 grid grid-cols-2 2xl:grid-cols-4">
                    <TeamCard
                        botImage="/bot6@2x.png"
                        founderName="Dreamer"
                        role={`Co-founder & CEO`}
                        profileLink="https://twitter.com/4twentieth"
                    />
                    <TeamCard
                        botImage="/bot4@2x.png"
                        founderName="Khalnayak"
                        role={`Co-founder & CTO`}
                        profileLink="https://twitter.com/khalnayakji_"
                    />
                    <TeamCard
                        botImage="/bot8@2x.png"
                        founderName="RoRo"
                        role={`Co-founder & CCO`}
                        profileLink="https://twitter.com/ro_ooo1"
                    />
                    <TeamCard
                        botImage="/bot5@2x.png"
                        founderName="Cookie Monster"
                        role={`Co-founder & Project Advisor`}
                        profileLink="https://twitter.com/iamcookiecrypto"
                    />
                    <TeamCard
                        botImage="/bot3@2x.png"
                        founderName="Chewbacca"
                        role={`Co-founder & COO`}
                        profileLink="https://twitter.com/CryptoWalrus057"
                    />
                    <TeamCard
                        botImage="/bot7@2x.png"
                        founderName="Grogu"
                        role={`Co-founder & CGO`}
                        profileLink="https://twitter.com/grogu_eth"
                    />

                    <TeamCard
                        botImage="/bot1@2x.png"
                        founderName="Jackson"
                        role={`Collab Manager`}
                        profileLink="https://twitter.com/whereis_jackson"
                    />
                    <TeamCard
                        botImage="/bot2@2x.png"
                        founderName="Beegoe"
                        role={`CMO`}
                        profileLink="https://twitter.com/beegoebeegoe"
                    />
                </div>
            </div>
        </div>
    );
};

export default TeamCards;
