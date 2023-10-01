import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const res = NextResponse.next();
    let ip = request.ip ?? request.headers.get("x-real-ip");
    const forwardedFor = request.headers.get("x-forwarded-for");
    if (!ip && forwardedFor) {
        ip = forwardedFor.split(",").at(0) ?? "Unknown";
    }
    return res;
}
