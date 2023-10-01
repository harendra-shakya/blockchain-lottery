import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "~~/services/logger/logger";

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT!;

const app = !admin.apps.length
    ? admin.initializeApp({
          credential: admin.credential.cert(JSON.parse(serviceAccount!)),
      })
    : admin.app();

const setUser = async (data: Record<string, string>, ip: string) => {
    const userDocRef = app.firestore().collection("users").doc(data.walletAddress!);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
        // User entry doesn't exist, store user data in Firestore
        await userDocRef
            .set({
                ...data,
                role: "user",
                joinDate: admin.firestore.FieldValue.serverTimestamp(),
                ipAddress: ip,
                blacklisted: false,
                allowlisted: false,
                isEmailVerified: false,
            })
            .then(() => {
                logger.info(`SUCCESS: New User: ${JSON.stringify(data)}`);
            })
            .catch(e => logger.error(e));
    }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { data } = req.body;

        let ip = req.headers["x-real-ip"] as string;

        const forwardedFor = req.headers["x-forwarded-for"] as string;
        if (!ip && forwardedFor) {
            ip = forwardedFor?.split(",").at(0) ?? "Unknown";
        }

        if (data == undefined) {
            return res.status(401).json({
                error: `Data is undefined`,
            });
        }

        // logger.info(`Adding data to DB ${JSON.stringify(data)}`);

        try {
            await setUser(data, ip);
            res.status(200).json({ error: null });
        } catch (e) {
            logger.error(e);
            return res.status(400).json({
                error: `Oops, something went wrong. Try again.`,
            });
        }
    }
};
