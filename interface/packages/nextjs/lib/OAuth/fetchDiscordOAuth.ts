export default function fetchDiscordOAuth() {
    try {
        const redirectURI = encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/discord`);
        const authURL = `https://discord.com/api/oauth2/authorize?client_id=1104978436755292261&redirect_uri=${redirectURI}&response_type=code&scope=identify%20guilds%20guilds.members.read`;

        return authURL;
    } catch (error: any) {
        console.log("Error", error);
    }
}
