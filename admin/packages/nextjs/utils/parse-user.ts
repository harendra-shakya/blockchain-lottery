import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import { GetServerSidePropsContext } from "next";

export function parseUser(ctx: GetServerSidePropsContext, cookieName: string) {
    if (!ctx.req.headers.cookie) {
        return null;
    }

    const token = parse(ctx.req.headers.cookie)[cookieName];

    if (!token) {
        return null;
    }

    try {
        const user = verify(token, process.env.JWT_SECRET!);
        return user;
    } catch (e) {
        return null;
    }
}
