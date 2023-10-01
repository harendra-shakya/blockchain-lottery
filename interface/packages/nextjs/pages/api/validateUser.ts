import { NextApiRequest, NextApiResponse } from "next";
import db from "~~/firebase";
import logger from "~~/services/logger/logger";

const isUserExists = async (key: string, value: string) => {
    if (!value) return false;

    const snapshot = await db.collection("allowlist").where(key, "==", value).get();

    if (snapshot.empty) return false;

    return true;
};

export default async function validateUser(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET") {
        try {
            const { discordUsername = null, twitterUsername = null, walletAddress = null } = req.query;

            const twitterExists = await isUserExists("twitterUsername", twitterUsername?.toString()!);

            const discordExists = await isUserExists("discordUsername", discordUsername?.toString()!);

            const addressExists = await isUserExists("walletAddress", walletAddress?.toString()!);

            const exists = twitterExists || discordExists || addressExists;

            return res.status(200).json({ response: exists });
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
