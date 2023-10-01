import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import db from "~~/firebase";
import logger from "~~/services/logger/logger";

export default async function fetchReferrals(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET") {
        try {
            const { limit = null } = req.query;

            if (!limit) {
                logger.error("Null limit");
                res.status(500).json({ error: "Null limit" });
            }

            const snapshot = await db.collection("allowlist").limit(+limit!).orderBy("referralPoints", "desc").get();

            const referrals = await Promise.all(
                snapshot.docs.map(async doc => ({
                    walletAddress: doc.id,
                    timestamp: moment(doc.data().timestamp.toDate()).unix(),
                    referralCode: doc.data().referralCode,
                    referralPoints: doc.data().referralPoints,
                    twitterUsername: doc.data().twitterUsername,
                })),
            );

            res.setHeader("Cache-Control", "s-maxage=10");
            return res.status(200).json({ response: referrals });
        } catch (error) {
            if (error instanceof Error) {
                logger.error(error);
                res.status(500).json({ error: error.message });
            }
        }
    } else {
        res.status(500).json({ error: "Not Get Request" });
    }
}
