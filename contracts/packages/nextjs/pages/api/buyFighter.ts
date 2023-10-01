import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "~~/services/logger/logger";

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT!;

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccount!)),
    })
  : admin.app();

const buyFighter = async (data: Record<string, string>) => {
  return app
    .firestore()
    .collection("battles")
    .doc(data.walletAddress)
    .set({
      ...data,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      logger.info(`SUCCESS: Data ${data} had been added to the DB`);
    })
    .catch(e => logger.error(e));
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { data } = req.body;

    if (data == undefined) {
      return res.status(401).json({
        error: `Data is undefined`,
      });
    }

    try {
      await buyFighter(data);
      res.status(200).json({ error: null });
    } catch (e) {
      logger.error(e);
      return res.status(400).json({
        error: `Oops, something went wrong. Try again.`,
      });
    }
  }
};
