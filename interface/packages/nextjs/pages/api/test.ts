import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        endBattle();

        return res.status(200).json({ message: "Function executed successfully" });
    } catch (error) {
        console.error("Error executing function:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

function endBattle() {
    console.log("Ending the battle...");
}
