import { NextApiRequest, NextApiResponse } from "next";
import db from "~~/firebase";
import logger from "~~/services/logger/logger";

export default async function fetchReferralCode(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET") {
        try {
            const { address } = req.query;
            logger.info(`Fetching Referral code and points of Address: ${address}`);

            const snapshot = await db.collection("allowlist").get();

            const referrals = await Promise.all(
                snapshot.docs.map(async doc => ({
                    walletAddress: doc.id,
                    referralCode: doc.data().referralCode,
                    referralPoints: doc.data().referralPoints,
                })),
            );

            logger.info(`Fetched Referral code and points. Response: ${JSON.stringify(referrals)}`);

            referrals.sort((a, b) => b.referralPoints - a.referralPoints);

            let referral = null;

            for (let i = 0; i < referrals.length; i++) {
                logger.info("wallAddress", referrals[i].walletAddress, address);
                if (referrals[i].walletAddress === address) {
                    referral = {
                        ...referrals[i],
                        position: i + 1,
                    };
                    break;
                }
            }

            if (referral) {
                logger.info(`Referral code found for Address: ${address}. Referral: ${referral}`);
            } else {
                logger.info(`No Referral code found for Address: ${address}`);
            }

            return res.status(200).json({ referral: referral });
        } catch (error) {
            if (error instanceof Error) {
                logger.error(error);
                res.status(500).json({ error: error.message });
            }
        }
    } else {
        res.status(500).json({ error: "No Get Request" });
    }
}
