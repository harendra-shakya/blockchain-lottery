import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import db from "~~/firebase";
import logger from "~~/services/logger/logger";

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT!;
const REFERRAL_POINTS = 50;

const app = !admin.apps.length
    ? admin.initializeApp({
          credential: admin.credential.cert(JSON.parse(serviceAccount!)),
      })
    : admin.app();

const storeInDB = async (data: Record<string, string>) => {
    return app
        .firestore()
        .collection("allowlist")
        .doc(data.walletAddress)
        .set({
            ...data,
            referralCode: data.twitterUsername,
            referralPoints: 0,
            status: "pending",
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            logger.info(`SUCCESS: Data ${data} had been added to the DB`);
        })
        .catch(e => logger.error(e));
};

const updateReferralPoints = async (data: Record<string, string>) => {
    const snapshot = await db
        .collection("allowlist")
        .where("referralCode", "==", data.referralCodeEntered.toLowerCase())
        .get();

    if (snapshot == undefined) {
        logger.error("Referral Code is incorrect");
    } else {
        const referrals = await Promise.all(
            snapshot.docs.map(async doc => ({
                walletAddress: doc.data().walletAddress,
                referralCode: doc.data().referralCode,
                referralPoints: doc.data().referralPoints,
            })),
        );

        if (referrals.length == 0) {
            return false;
        } else if (referrals.length != 0) {
            const newReferralPoints = +referrals[0].referralPoints + +REFERRAL_POINTS;

            app.firestore()
                .collection("allowlist")
                .doc(referrals[0].walletAddress)
                .update({
                    referralPoints: newReferralPoints,
                })
                .then(() => {
                    logger.info(
                        `SUCCESS: Updated referral points of ${referrals[0].walletAddress} to ${newReferralPoints}`,
                    );
                });

            return true;
        }
    }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { data } = req.body;

        if (data == undefined) {
            return res.status(401).json({
                error: `Data is undefined`,
            });
        }

        // logger.info(`Adding data to DB ${JSON.stringify(data)}`);

        try {
            if (!!data.referralCodeEntered) {
                const exists = await updateReferralPoints(data);

                if (!exists) {
                    logger.error(`Incorrect Referral Code. Please leave empty if you don't have one.`);
                    return res.status(201).json({
                        error: `Incorrect Referral Code. Please leave empty if you don't have one.`,
                    });
                }
            }
            await storeInDB(data);
            res.status(200).json({ error: null });
        } catch (e) {
            logger.error(e);
            return res.status(400).json({
                error: `Oops, something went wrong. Try again.`,
            });
        }
    }
};
