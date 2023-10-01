import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "~~/services/logger/logger";

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT!;

const app = !admin.apps.length
    ? admin.initializeApp({
          credential: admin.credential.cert(JSON.parse(serviceAccount!)),
      })
    : admin.app();

const updateStatus = async (status: string, walletAddress: string, user: any) => {
    app.firestore()
        .collection("allowlist")
        .doc(walletAddress)
        .update({
            reviewer: user.name,
            status: status,
        })
        .then(() => {
            logger.info(`SUCCESS: ${user.name}(${user.email}) Updated status of ${walletAddress} to ${status}`);
        });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { user, status, walletAddress } = req.body;

        if (status == undefined) {
            return res.status(401).json({
                error: `status is undefined`,
            });
        }

        try {
            await updateStatus(status, walletAddress, user);
            return res.status(200).json({ error: null });
        } catch (e) {
            logger.error(e);
            return res.status(400).json({
                error: `Oops, something went wrong..`,
            });
        }
    }
};
