import { useState } from "react";
import { Property } from "csstype";
import type { NextPage } from "next";

type AllowlistQuestionType = {
    question?: string;
    placeholder?: string;
    minimumNumberOfCharacters?: string;

    /** Style props */
    propBorder?: Property.Border;
    propColor?: Property.Color;
};

const AllowlistQuestion: NextPage<AllowlistQuestionType> = ({ question, placeholder, minimumNumberOfCharacters }) => {
    const [answer, setAnswer] = useState("");

    return (
        <div className="mx-auto max-w-screen flex flex-col px-0 items-start justify-start gap-[48px] text-left text-13xl text-white font-body-24">
            <div className="mx-6 md:mx-10">
                <div className="flex flex-row items-center justify-start gap-[54px] font-orbitron">
                    <p className="m-0 flex flex-wrap default-tracking leading-[40px] uppercase w-full lg:w-[1121px] shrink-0">
                        {question}
                    </p>
                </div>
                <div
                    className={`flex flex-col items-start justify-start gap-[16px] py-10 text-right text-xs text-moderate-pink ${
                        answer.length < 10 ? "text-moderate-pink" : "text-purple-400"
                    }`}
                >
                    <textarea
                        className={`
          font-orbitron  text-5xl bg-[transparent] rounded-lg  border-gray box-border w-full lg:w-[1199px] h-[180px] shrink-0 flex flex-row py-8 px-6 items-start justify-start border-[1px] border-solid text-white ${
              answer.length < 10 ? "border-moderate-pink" : "border-purple-400"
          }`}
                        // type="text"
                        placeholder={placeholder}
                        onChange={e => {
                            setAnswer(e.target.value);
                        }}
                    />
                    <p className="m-0 flex flex-wrap leading-[24px] uppercase w-full lg:w-[1199px]">
                        {minimumNumberOfCharacters}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AllowlistQuestion;
