import * as admin from "firebase-admin";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import logger from "~~/services/logger/logger";

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT!;

const app = !admin.apps.length
    ? admin.initializeApp({
          credential: admin.credential.cert(JSON.parse(serviceAccount!)),
      })
    : admin.app();

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
        // ...add more providers here
    ],

    callbacks: {
        async session({ session }: { session: any }) {
            if (session.user) {
                const userDocRef = app.firestore().collection("users").doc(session.user.email!);
                const userDoc = await userDocRef.get();

                if (!userDoc.exists) {
                    // User entry doesn't exist, store user data in Firestore
                    await userDocRef.set({
                        name: session.user.name,
                        email: session.user.email,
                        role: "user",
                    });
                    logger.info(`INFO: New User - ${session.user.name} ${session.user.email} (ROLE: user) Logged In`);

                    // Set the isAdmin property as false for new users
                    session.user.isAdmin = false;
                } else {
                    // Get the role from the user document in Firestore
                    const userData = userDoc.data();
                    console.log("userData", userData);
                    const userRole = userData?.role;
                    session.user.isAdmin = userRole === "admin";

                    logger.info(`INFO: ${session.user.name} ${session.user.email} (ROLE: ${userRole}) Logged In`);
                }
            }

            return session;
        },
    },
};

export default NextAuth(authOptions);
