import { NextApiRequest, NextApiResponse } from "next";
import db from "~~/firebase";
import logger from "~~/services/logger/logger";

interface Referral {
    walletAddress: string;
    twitterUsername: string;
    discordUsername: string;
    referralCode: string;
    referralPoints: number;
    position: number;
}

interface PositionReferral {
    walletAddress: string;
    twitterUsername: string;
    referralCode: string;
    referralPoints: number;
    position: number;
}

const isUserExists = async (key: string, value: string) => {
    if (!value) return false;

    const snapshot = await db.collection("allowlist").where(key, "==", value).get();

    if (snapshot.empty) return false;

    return true;
};

const fetchUser = async (key: string, value: string) => {
    if (!value) return false;

    let snapshot = await db.collection("allowlist").orderBy("referralPoints", "desc").get();

    const referrals: Referral[] = await Promise.all(
        snapshot.docs.map(async (doc, i) => ({
            walletAddress: doc.id,
            twitterUsername: doc.data().twitterUsername,
            discordUsername: doc.data().discordUsername,
            referralCode: doc.data().referralCode,
            referralPoints: doc.data().referralPoints,
            position: i + 1,
        })),
    );

    // const referralIndex = referrals.findIndex(referral => referral[key as keyof Referral] === value) + 1;

    let referralIndex: number;

    referrals.forEach((referral, i) => {
        if (referral[key as keyof Referral] === value) {
            referralIndex = i + 1;
            return;
        }
    });

    // snapshot for referral
    snapshot = await db
        .collection("allowlist")
        .where(key as keyof Referral, "==", value)
        .get();

    if (snapshot.empty) {
        logger.error(`Snapshot is empty. fetchUser. Error key as keyof Referral, "==", value`);
        return false;
    }

    const referral: PositionReferral = {
        walletAddress: snapshot.docs[0].id,
        twitterUsername: snapshot.docs[0].data().twitterUsername,
        referralCode: snapshot.docs[0].data().referralCode,
        referralPoints: snapshot.docs[0].data().referralPoints,
        position: referralIndex!,
    };

    return referral;
};

export default async function fetchReferralCode(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET") {
        try {
            const { discordUsername = null, twitterUsername = null, walletAddress = null } = req.query;

            const keys = ["walletAddress", "twitterUsername", "discordUsername"];
            const values = [walletAddress, twitterUsername, discordUsername];

            let referral;

            await Promise.all(
                keys.map(async (key, i) => {
                    const exist = await isUserExists(key, values[i]?.toString()!);
                    if (exist) {
                        referral = await fetchUser(key, values[i]?.toString()!);
                        return;
                    }
                }),
            );
            // res.setHeader("Cache-Control", "s-maxage=10");
            return res.status(200).json({ referral: referral });
        } catch (error) {
            if (error instanceof Error) {
                logger.error(error);
                res.status(500).json({ error: error.message });
            }
        }
    } else {
        res.status(500).json({ error: "No Get Request" });
    }
}
