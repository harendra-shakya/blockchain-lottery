// import axios from "axios";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "~~/services/logger/logger";

const { JWT_SECRET } = process.env;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return res.redirect("/");
    try {
        const { cookieName = null, data = null } = req.body;

        if (!cookieName || !data) {
            logger.error(`Data Undefined: cookieName ${cookieName}. data ${data}`);
            return res.status(400).json({
                error: "Data Undefined",
            });
        }

        // Sign a JWT with the payload of the current user...
        const token = jwt.sign(data!, JWT_SECRET!, { expiresIn: "24h" });

        // ...and set it as a header
        res.setHeader(
            "Set-Cookie",
            cookie.serialize(cookieName?.toString()!, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "lax",
                path: "/",
            }),
        );
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
