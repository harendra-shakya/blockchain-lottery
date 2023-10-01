import admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";

// Initialize Firebase Admin SDK
admin.initializeApp();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { battleId } = req.body;

        const scheduledTime = Date.now() + 24 * 60 * 60 * 1000; // Add 24 hours in milliseconds

        await admin
            .firestore()
            .doc(`scheduledTasks/${battleId}`)
            .set({
                scheduledTime: new Date(scheduledTime),
                completed: false,
            });

        return res.status(200).json({ message: "Task scheduled successfully" });
    } catch (error) {
        console.error("Error scheduling task:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
