// import axios from "axios";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import logger from "~~/services/logger/logger";

// Extract environment variables from process.env
// (we will come on to this later)
const {
    DISCORD_CLIENT_SECRET,
    DISCORD_CLIENT_ID,
    NEXT_PUBLIC_APP_URL,
    JWT_SECRET,
    NEXT_PUBLIC_DISCORD_COOKIE_NAME,
    BOT_TOKEN,
} = process.env;

// Create scopes, fetchDiscordUsername querystring and URIs
const scope = ["identify", "guilds", "guilds.members.read"].join(" ");
const REDIRECT_URI = `${NEXT_PUBLIC_APP_URL}/api/auth/callback/discord`;

const checkUserInServer = async (userId: string): Promise<boolean> => {
    const guildId = "1036936965867712554";

    const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}`, {
        headers: {
            Authorization: `Bot ${BOT_TOKEN}`,
        },
    });

    return response.ok;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") return res.redirect("/");
    try {
        logger.info(`Fetching discord user`);

        const { code = null, error = null } = req.query;

        if (error) {
            return res.redirect("/allowlist");
        }

        // If there is no code, redirect to the OAuth URI
        if (!code || typeof code !== "string") return res.redirect("/allowlist");

        const body = new URLSearchParams({
            client_id: DISCORD_CLIENT_ID!,
            client_secret: DISCORD_CLIENT_SECRET!,
            grant_type: "authorization_code",
            redirect_uri: REDIRECT_URI,
            code,
            scope,
        }).toString();

        const access_token: Record<string, string | number> = (await fetch("https://discord.com/api/v10/oauth2/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            method: "POST",
            body,
        })
            .then(res => res.json())
            .catch(e => logger.error(e))) as Record<string, string | number>;

        // If the access token does not exist, return
        if (!access_token!.expires_in!) {
            return res.redirect("/allowlist");
        }

        // Fetch this current user (uses the "identify" scope)
        const response = await fetch("https://discord.com/api/users/@me", {
            headers: { Authorization: `${access_token.token_type} ${access_token.access_token}` },
        });

        const userJson: Record<string, string | number> = (await response.json()) as Record<string, string | number>;

        // If the id does not exist in the response body, request reauthorization
        if (!("id" in userJson)) {
            return res.redirect("/allowlist");
        }

        const userId = userJson.id;

        const isMember = await checkUserInServer(userId.toString());

        if (!isMember) {
            const token = jwt.sign({ notDiscordMember: true }, JWT_SECRET!, { expiresIn: "24h" });

            res.setHeader(
                "Set-Cookie",
                cookie.serialize(NEXT_PUBLIC_DISCORD_COOKIE_NAME!, token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    sameSite: "lax",
                    path: "/",
                }),
            );

            return res.redirect("/allowlist");
        }

        // Sign a JWT with the payload of the current user...
        const token = jwt.sign(userJson, JWT_SECRET!, { expiresIn: "24h" });

        // ...and set it as a header
        res.setHeader(
            "Set-Cookie",
            cookie.serialize(NEXT_PUBLIC_DISCORD_COOKIE_NAME!, token, {
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
