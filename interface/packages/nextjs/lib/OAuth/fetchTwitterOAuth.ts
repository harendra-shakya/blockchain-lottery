/* eslint-disable  @typescript-eslint/no-var-requires */
import axios from "axios";

export default async function fetchTwitterOAuth() {
    try {
        const res = await axios.post("/api/fetchTwitterOauthUrl");
        const url = res.data.authUrl;
        return url;
    } catch (error: any) {
        console.log("Error", error);
    }
}
