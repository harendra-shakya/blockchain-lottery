import cookie from "cookie";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import Twitter from "twitter-lite";
import logger from "~~/services/logger/logger";

const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;

const { NEXT_PUBLIC_TWITTER_COOKIE_NAME, JWT_SECRET } = process.env;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") return res.redirect("/");
    try {
        const { oauth_token = null, oauth_verifier = null, error = null } = req.query;

        // logger.info(`oauth_token: ${oauth_token}`);
        // logger.info(`oauth_verifier: ${oauth_verifier}`);
        logger.info(`Fetching twitter user`);

        if (error) {
            return res.status(401).json({ error: error });
        }

        const client = new Twitter({
            consumer_key: CONSUMER_KEY!,
            consumer_secret: CONSUMER_SECRET!,
        });

        const response = await client.getAccessToken({
            oauth_verifier: oauth_verifier!.toString()!,
            oauth_token: oauth_token!.toString()!,
        });

        const user: {
            userId: string;
            screenName: string;
        } = {
            // accTkn: response.oauth_token,
            // accTknSecret: response.oauth_token_secret,
            userId: response.user_id,
            screenName: response.screen_name,
        };
        logger.info(`Fetched Twitter User: ${JSON.stringify(user)}`);

        if (!("userId" in user)) {
            return res.status(401).json({
                error: "Err: User not found",
            });
        }

        const token = jwt.sign(user!, JWT_SECRET!, { expiresIn: "24h" });

        // ...and set it as a header
        res.setHeader(
            "Set-Cookie",
            cookie.serialize(NEXT_PUBLIC_TWITTER_COOKIE_NAME!, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "lax",
                path: "/",
            }),
        );

        res.redirect("/allowlist");
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e);
            res.status(400).json({
                error: e.message,
            });
        }
    }
};
