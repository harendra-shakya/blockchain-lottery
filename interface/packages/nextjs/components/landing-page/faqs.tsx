import dynamic from "next/dynamic";
import SectionContainer from "../SectionContainer";
import type { NextPage } from "next";
import { faqs } from "~~/constants/questions";

const FAQ = dynamic(() => import("./faq"), { ssr: false });

const FAQS: NextPage = () => {
    return (
        <SectionContainer id="faqs">
            <div className="flex mx-auto  max-w-screen overflow-x-hidden flex-col items-center justify-start gap-12 default-scale">
                <h2 className="m-0 h-shadow mx-auto mt-20 default-tracking leading-[104px] uppercase default-text-77xl">
                    FAQ
                </h2>
                <div className="flex mx-auto flex-col items-start justify-start text-21xl">
                    {faqs.map((faq, i) => (
                        <FAQ faqQuestion={faq.faqQuestion} faqAnswer={faq.faqAnswer} key={`faq-${i}`} />
                    ))}
                </div>
            </div>
        </SectionContainer>
    );
};

export default FAQS;
