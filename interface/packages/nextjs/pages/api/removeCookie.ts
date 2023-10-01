import { deleteCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "~~/services/logger/logger";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") return res.redirect("/");
    try {
        const { cookieName } = req.query;

        deleteCookie(cookieName?.toString()!, { req, res });
        return res.status(200).json({ message: "ok" });
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e);
            res.status(400).json({
                error: e.message,
            });
        }
    }
};
