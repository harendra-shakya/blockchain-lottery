import { useState } from "react";
import type { NextPage } from "next";

type FAQType = {
    faqQuestion?: string;
    faqAnswer?: string;
};

const FAQ: NextPage<FAQType> = ({ faqQuestion, faqAnswer }) => {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`flex mx-auto w-full max-w-screen flex-col py-10 px-4 items-start justify-start gap-6 text-left text-21xl text-white font-orbitron border-b-[1px] border-solid 
    ${open ? "border-[#8233ff]" : "border-gray"}`}
        >
            <div className="flex flex-row items-center justify-start gap-12 ">
                <h3
                    className={`m-0 default-tracking cursor-pointer leading-[48px]  inline-block w-faq shrink-0 text-21xl ${
                        open ? "text-transparent bg-clip-text  font-orbitron primary-gradient-br" : ""
                    }`}
                    onClick={() => {
                        setOpen(!open);
                    }}
                >
                    {faqQuestion}
                </h3>
                {open ? (
                    <p className="m-0 shrink-0 text-gradient-tr cursor-pointer" onClick={() => setOpen(false)}>
                        -
                    </p>
                ) : (
                    <p className="m-0 shrink-0 cursor-pointer" onClick={() => setOpen(true)}>
                        +
                    </p>
                )}
            </div>
            <div className={` text-5xl default-tracking leading-[48px]  text-gray  w-faq ${open ? "" : "hidden"}`}>
                {faqAnswer}
            </div>
        </div>
    );
};

export default FAQ;
