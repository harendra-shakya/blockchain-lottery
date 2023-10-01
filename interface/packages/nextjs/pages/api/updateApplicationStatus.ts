import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
// import db from "~~/firebase";
import logger from "~~/services/logger/logger";

// const crypto = require("crypto");

// Secure connection to firebase from the backend
// const serviceAccount = require("../../permissions.json");

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT!;

const app = !admin.apps.length
    ? admin.initializeApp({
          credential: admin.credential.cert(JSON.parse(serviceAccount!)),
      })
    : admin.app();

const updateStatus = async (status: string, walletAddress: string) => {
    app.firestore()
        .collection("allowlist")
        .doc(walletAddress)
        .update({
            status: status,
        })
        .then(() => {
            logger.info(`SUCCESS: Updated status of ${walletAddress} to ${status}`);
        });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { status, walletAddress } = req.body;

        if (status == undefined) {
            return res.status(401).json({
                error: `status is undefined`,
            });
        }

        // logger.info(`Adding data to DB ${JSON.stringify(data)}`);

        try {
            await updateStatus(status, walletAddress);
            return res.status(200).json({ error: null });
        } catch (e) {
            logger.error(e);
            return res.status(400).json({
                error: `Oops, something went wrong..`,
            });
        }
    }
};
