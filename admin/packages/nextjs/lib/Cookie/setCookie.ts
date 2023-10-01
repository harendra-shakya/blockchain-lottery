/* eslint-disable  @typescript-eslint/no-var-requires */
import axios from "axios";

export default async function setCookie(cookieName: string, data: Record<string, any>) {
    try {
        await axios.post("/api/setCookie", { cookieName: cookieName, data: data });
    } catch (error: any) {
        console.log("Error", error);
    }
}
