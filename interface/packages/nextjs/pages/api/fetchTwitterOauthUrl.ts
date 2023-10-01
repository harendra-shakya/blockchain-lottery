import { NextApiRequest, NextApiResponse } from "next";
import Twitter from "twitter-lite";
import logger from "~~/services/logger/logger";

const CONSUMER_KEY = process.env.CONSUMER_KEY!;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET!;
const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = new Twitter({
            consumer_key: CONSUMER_KEY,
            consumer_secret: CONSUMER_SECRET,
        });

        const requestToken: Record<string, string> = await client.getRequestToken(
            `${NEXT_PUBLIC_APP_URL}/api/auth/callback/twitter`,
        );

        const authorizationUrl = `https://api.twitter.com/oauth/authenticate?oauth_token=${requestToken.oauth_token}`;
        logger.info(`The Authorization url for twitter ${authorizationUrl}`);

        res.setHeader("Cache-Control", "s-maxage=10");
        return res.status(200).json({ error: null, authUrl: authorizationUrl });
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e);
            res.status(400).json({
                error: e.message,
            });
        }
    }
};
