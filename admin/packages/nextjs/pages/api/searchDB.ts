import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import db from "~~/firebase";
import logger from "~~/services/logger/logger";

export default async function fetchReferralCode(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET") {
        try {
            const { searchTerm } = req.query;
            const allowlistQuestions = await db.collection("allowlist").get();

            const wlquestions: Array<any> = await Promise.all(
                allowlistQuestions.docs.map(async question => ({
                    ...question.data(),
                    timestamp: moment(question.data().timestamp.toDate()).unix(),
                })),
            );

            // Filter the wlquestions based on the search term
            const filteredQuestions = wlquestions.filter(question => {
                const twitterUsername = question.twitterUsername.toLowerCase();
                const discordUsername = question.discordUsername.toLowerCase();
                const walletAddress = question.walletAddress.toLowerCase();
                const search = typeof searchTerm === "string" ? searchTerm.toLowerCase() : searchTerm;
                return (
                    twitterUsername.includes(search) ||
                    discordUsername.includes(search) ||
                    walletAddress.includes(search)
                );
            });

            filteredQuestions.sort((a, b) => {
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

            return res.status(200).json({ data: filteredQuestions });
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
