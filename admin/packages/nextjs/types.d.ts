type Session = {
    expires?: string;
    user: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
        isAdmin?: boolean;
    };
};

type User = {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    isAdmin?: boolean;
};

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
    price: BigNumber;
};

type ClaimData = {
    numEntriesPerUser: number;
    amountSpentInWeis: number;
    claimed: boolean;
};
