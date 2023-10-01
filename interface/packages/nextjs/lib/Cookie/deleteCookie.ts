/* eslint-disable  @typescript-eslint/no-var-requires */
import axios from "axios";

export default async function deleteCookie(cookieName: string) {
    try {
        await axios.get("/api/removeCookie", {
            params: {
                cookieName: cookieName,
            },
        });
    } catch (error: any) {
        console.log("Error", error);
    }
}
