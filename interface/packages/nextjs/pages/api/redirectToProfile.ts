import type { NextApiRequest, NextApiResponse } from "next";
import db from "~~/firebase";
import logger from "~~/services/logger/logger";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { walletAddress } = req.body;

        const userDoc = await db.collection("users").where("walletAddress", "==", walletAddress).get();

        // If no user, short circuit to 404 page
        if (userDoc.empty) {
            return {
                notFound: true,
            };
        }

        const user: any = await Promise.all(
            userDoc.docs.map(async doc => ({
                username: doc.data().username,
            })),
        );

        console.log("users", user[0].username);

        const username = user[0].username;

        return res.status(200).json({ response: username });
    } catch (err) {
        logger.error(err);
        res.status(400);
    }
};
