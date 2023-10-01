type ReferralData = {
    data: {
        walletAddress: string;
        referralCode: string;
        referralPoints: number;
        position: string;
    };
};

// type UserSocialData = {
//     user: Record<string, Record<string, string | number>>;
// };

type UserSocialData = {
    user: {
        discord: Record<string, string | number> | null;
        twitter: Record<string, string | number> | null;
        walletAddress: Record<string, string | number> | null;
    };
};

type SocialData = {
    discord: Record<string, string | number> | null;
    twitter: Record<string, string | number> | null;
    walletAddress: Record<string, string | number> | null;
};

type User = {
    username: string;
    walletAddress: string;
    role?: "user";
    joinDate?: string;
    ipAddress?: string;
    blacklisted?: boolean;
    allowlisted?: boolean;
    isEmailVerified?: boolean;
};

type BattleStruct = {
    status: Status;
    battleId: number;
    winner: string; // Use the appropriate type for the address (e.g., string or Address)
    isJackpotBattle: boolean;
    randomNumber: number;
    amountCollected: number;
    treasuryFee: number;
    collectionTokenIdUsed: number;
    entriesLength: number;
    cancellingDate: number;
    nftCollectionWhitelist: string[]; // Use the appropriate type for the address (e.g., string or Address)
};

type PriceStructure = {
    id: number;
    numEntries: number;
    price: number;
};

type ClaimData = {
    numEntriesPerUser: number;
    amountSpentInWeis: number;
    claimed: boolean;
};
