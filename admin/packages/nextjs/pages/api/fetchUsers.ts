import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import db from "~~/firebase";
import logger from "~~/services/logger/logger";

export default async function fetchReferralCode(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET") {
        try {
            const allowlistQuestions = await db.collection("allowlist").limit(10).get();

            const wlquestions: Array<any> = await Promise.all(
                allowlistQuestions.docs.map(async question => ({
                    ...question.data(),
                    timestamp: moment(question.data().timestamp.toDate()).unix(),
                })),
            );

            wlquestions.sort((a, b) => {
                if (a.status === "pending" && b.status === "pending") {
                    // Both have pending status, sort by referralPoints
                    return b.referralPoints - a.referralPoints;
                } else if (a.status === "pending") {
                    // Only a has pending status, it should be higher in the list
                    return -1;
                } else if (b.status === "pending") {
                    // Only b has pending status, it should be higher in the list
                    return 1;
                } else {
                    // Neither have pending status, maintain the existing order
                    return 0;
                }
            });
        } catch (e) {
            logger.error(e);
            res.status(500).json({ error: e });
        }
    } else {
        res.status(500).json({ error: "Not Get Request" });
    }
}
