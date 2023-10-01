import MainLayout from "./layouts/MainLayout";
import type { NextPage } from "next";

interface IPolicy {
    title: string;
    body: string[];
}

const Policy: NextPage<IPolicy> = ({ title, body }) => {
    return (
        <MainLayout>
            <div className="mx-8 default-scale default-my  md:mx-20 lg:mx-60 xl:mx-80 flex flex-col gap-[60px]">
                <p
                    className="m-0 md:mt-40 text-white default-text-77xl leading-[50px] md:leading-[101px] uppercase"
                    id="terms-and-conditions"
                >
                    {title}
                </p>
                <div className="text-5xl text-gray leading-[32px] text-gray-100">
                    {body.map((info, i) => (
                        <p className="" key={i}>
                            {info}
                        </p>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default Policy;
