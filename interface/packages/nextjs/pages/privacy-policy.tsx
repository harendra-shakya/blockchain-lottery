import type { NextPage } from "next";
import { Meta } from "~~/components/Meta";
import Policy from "~~/components/policy";
import { privacyPolicy } from "~~/constants/policy";

const PrivacyPolicy: NextPage = () => {
    return (
        <>
            <Meta
                title={"Privacy Policy | Chain Warz - Your Secure Crypto Lottery Platform"}
                description={
                    "At Chain Warz, we prioritize your privacy. Discover how we diligently protect your personal information on our cutting-edge blockchain gaming platform. Explore our Privacy Policy here."
                }
                imageUrl="https://chainwarz.io/chainwarzMetaLogo.jpg"
                url="https://chainwarz.io/privacy-policy"
            />
            <Policy title={privacyPolicy.title} body={privacyPolicy.body} />
        </>
    );
};

export default PrivacyPolicy;
