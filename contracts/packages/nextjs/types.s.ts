enum Status {
  Pending,
  Open,
  Close,
  Cancelled,
}

interface BattleStruct {
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
}

interface PriceStructure {
  id: number;
  numEntries: number;
  price: number;
}

interface ClaimData {
  numEntriesPerUser: number;
  amountSpentInWeis: number;
  claimed: boolean;
}
