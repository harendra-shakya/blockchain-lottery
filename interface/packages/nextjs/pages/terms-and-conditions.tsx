import type { NextPage } from "next";
import { Meta } from "~~/components/Meta";
import DocumentContainer from "~~/components/policy";
import { termsAndConditions } from "~~/constants/policy";

const TermsAndConditions: NextPage = () => {
    return (
        <>
            <Meta
                title={"Terms and Conditions | Chain Warz - Rules of Engagement"}
                description={
                    "Delve into the rules of engagement with Chain Warz, a pioneer in the world of decentralized, gamified lottery platforms. Discover our terms and conditions to ensure a smooth experience."
                }
                imageUrl="https://chainwarz.io/chainwarzMetaLogo.jpg"
                url="https://chainwarz.io/terms-and-conditions"
            />
            <DocumentContainer title={termsAndConditions.title} body={termsAndConditions.body} />
        </>
    );
};

export default TermsAndConditions;
