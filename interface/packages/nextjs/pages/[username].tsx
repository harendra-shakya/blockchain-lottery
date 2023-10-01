import moment from "moment";
import { NextPage } from "next";
import MainLayout from "~~/components/layouts/MainLayout";
import Profile from "~~/components/profile/Profile";
import db from "~~/firebase";

interface IUser {
    user?: User;
    notFound?: boolean;
}

const User: NextPage<IUser> = ({ user, notFound }) => {
    return (
        <MainLayout>
            <>{notFound ? <div className="text-white">not found</div> : <Profile user={user!} />}</>
        </MainLayout>
    );
};

export default User;

export async function getServerSideProps({ query }: { query: any }) {
    const { username } = query;

    const userDoc = await db.collection("users").where("username", "==", username).get();

    // If no user, short circuit to 404 page
    if (userDoc.empty) {
        return {
            notFound: true,
        };
    }
    const user: any = await Promise.all(
        userDoc.docs.map(async doc => ({
            walletAddress: doc.data().walletAddress,
            username: username,
            joinDate: moment(doc.data().joinDate.toDate()).unix(),
        })),
    );

    return {
        props: { user: user[0] },
    };
}
