const contracts = {
  5: [
    {
      chainId: "5",
      name: "goerli",
      contracts: {
        BlackListManager: {
          address: "0xF9c53A8202341cA14f3A0ef8e72dE14d67F24e6D",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "previousAdminRole",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "newAdminRole",
                  type: "bytes32",
                },
              ],
              name: "RoleAdminChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "RoleGranted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "RoleRevoked",
              type: "event",
            },
            {
              inputs: [],
              name: "DEFAULT_ADMIN_ROLE",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "OPERATOR_ROLE",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_player",
                  type: "address",
                },
              ],
              name: "addToBlackList",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "blackList",
              outputs: [
                {
                  internalType: "bool",
                  name: "blacklisted",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "dateBlacklisted",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_player",
                  type: "address",
                },
              ],
              name: "getBlackListedDate",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
              ],
              name: "getRoleAdmin",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "grantRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "hasRole",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_player",
                  type: "address",
                },
              ],
              name: "isBlackListed",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_player",
                  type: "address",
                },
              ],
              name: "removeFromBlackList",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "renounceRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "revokeRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        ChainWarzLottery: {
          address: "0x774C2BAfc348dc45ED609CA686CD40C64e2a0590",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_blacklistManager",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_vrfCoordinator",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_linkToken",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_treasuryAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_operatorAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_injectorAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_reserveFundAddress",
                  type: "address",
                },
                {
                  internalType: "bytes32",
                  name: "_keyHash",
                  type: "bytes32",
                },
                {
                  internalType: "bool",
                  name: "_mainnetFee",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "battleId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amountCollected",
                  type: "uint256",
                },
              ],
              name: "BattleCancelled",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "requestId",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "battleId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amountCollected",
                  type: "uint256",
                },
              ],
              name: "BattleEnded",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "battleId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "injectedAmount",
                  type: "uint256",
                },
              ],
              name: "BattleInjection",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "battleId",
                  type: "uint256",
                },
              ],
              name: "BattleStarted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "battleId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amountOfEntriesCanceled",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "player",
                  type: "address",
                },
              ],
              name: "EntryCancelled",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "battleId",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "buyer",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "currentSize",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "priceStructureId",
                  type: "uint256",
                },
              ],
              name: "FightersPurchase",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "address[]",
                  name: "_players",
                  type: "address[]",
                },
                {
                  indexed: false,
                  internalType: "uint256[]",
                  name: "_numEntries",
                  type: "uint256[]",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "totalAmountOfEntries",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "currentSize",
                  type: "uint256",
                },
              ],
              name: "FreeEntry",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "battleId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "treasuryFee",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "weeklyJackpotBattleBps",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "stakersReward",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "winnerPrize",
                  type: "uint256",
                },
              ],
              name: "PrizeTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "randomNumber",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "normalizedRandomNumber",
                  type: "uint256",
                },
              ],
              name: "RandomNumberCreated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "battleId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amountInWeis",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "player",
                  type: "address",
                },
              ],
              name: "Refund",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "battleId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amountInWeis",
                  type: "uint256",
                },
              ],
              name: "RemainingFundsTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "newStakersReward",
                  type: "uint256",
                },
              ],
              name: "StakersRewardChanged",
              type: "event",
            },
            {
              inputs: [],
              name: "MAX_JACKPOT_BATTLE_CONTRIBUTION",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "MAX_TREASURY_FEE",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_priceId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_collection",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_tokenIdUsed",
                  type: "uint256",
                },
              ],
              name: "buyFighter",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_priceId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_collection",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_tokenIdUsed",
                  type: "uint256",
                },
              ],
              name: "buyFighterAndGetWeeklyFreeEntries",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
              ],
              name: "cancelBattle",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
                {
                  internalType: "uint256[]",
                  name: "_entriesToCancel",
                  type: "uint256[]",
                },
                {
                  internalType: "address",
                  name: "_player",
                  type: "address",
                },
              ],
              name: "cancelEntry",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
              ],
              name: "claimRefund",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
              ],
              name: "claimWeeklyFreeEntries",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_amountOfEntries",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_player",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "price",
                  type: "uint256",
                },
              ],
              name: "createEntries",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
              ],
              name: "endBattle",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "fundManaderAddress",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
              ],
              name: "getBattle",
              outputs: [
                {
                  components: [
                    {
                      internalType: "enum ChainWarzLottery.Status",
                      name: "status",
                      type: "uint8",
                    },
                    {
                      internalType: "uint256",
                      name: "maxEntries",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "winner",
                      type: "address",
                    },
                    {
                      internalType: "bool",
                      name: "isJackpotBattle",
                      type: "bool",
                    },
                    {
                      internalType: "uint256",
                      name: "randomNumber",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "amountCollected",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "treasuryFee",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "weeklyJackpotBattleBps",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "entriesLength",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "cancellingDate",
                      type: "uint256",
                    },
                    {
                      internalType: "address[]",
                      name: "nftCollectionWhitelist",
                      type: "address[]",
                    },
                  ],
                  internalType: "struct ChainWarzLottery.BattleStruct",
                  name: "battle",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getBattles",
              outputs: [
                {
                  components: [
                    {
                      internalType: "enum ChainWarzLottery.Status",
                      name: "status",
                      type: "uint8",
                    },
                    {
                      internalType: "uint256",
                      name: "maxEntries",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "winner",
                      type: "address",
                    },
                    {
                      internalType: "bool",
                      name: "isJackpotBattle",
                      type: "bool",
                    },
                    {
                      internalType: "uint256",
                      name: "randomNumber",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "amountCollected",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "treasuryFee",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "weeklyJackpotBattleBps",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "entriesLength",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "cancellingDate",
                      type: "uint256",
                    },
                    {
                      internalType: "address[]",
                      name: "nftCollectionWhitelist",
                      type: "address[]",
                    },
                  ],
                  internalType: "struct ChainWarzLottery.BattleStruct[]",
                  name: "_battles",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_requestId",
                  type: "bytes32",
                },
              ],
              name: "getChainlinkBattleInfo",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "id",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "size",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct ChainWarzLottery.BattleInfo",
                  name: "_battleInfo",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_player",
                  type: "address",
                },
              ],
              name: "getClaimData",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "numEntriesPerUser",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "amountSpentInWeis",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "claimed",
                      type: "bool",
                    },
                  ],
                  internalType: "struct ChainWarzLottery.ClaimData",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
              ],
              name: "getEntries",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "currentEntriesLength",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "player",
                      type: "address",
                    },
                  ],
                  internalType: "struct ChainWarzLottery.Entries[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
              ],
              name: "getEntriesList",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "currentEntriesLength",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "player",
                      type: "address",
                    },
                  ],
                  internalType: "struct ChainWarzLottery.Entries[]",
                  name: "_entries",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
              ],
              name: "getIsFreeEntryClaimed",
              outputs: [
                {
                  internalType: "bool",
                  name: "_claimed",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
              ],
              name: "getPrices",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "id",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "numEntries",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "price",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct ChainWarzLottery.PriceStructure[5]",
                  name: "_prices",
                  type: "tuple[5]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_requiredNFTHash",
                  type: "bytes32",
                },
              ],
              name: "getRequiredNFTWallet",
              outputs: [
                {
                  internalType: "address",
                  name: "_address",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_jackpotBattleId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
              ],
              name: "getWeeklyFreeEntries",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint128",
                      name: "freeEntries",
                      type: "uint128",
                    },
                    {
                      internalType: "bool",
                      name: "claimed",
                      type: "bool",
                    },
                  ],
                  internalType: "struct ChainWarzLottery.FreeEntries",
                  name: "_freeEntries",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_jackpotBattleId",
                  type: "uint256",
                },
              ],
              name: "getWeeklyJackpotBattle",
              outputs: [
                {
                  components: [
                    {
                      internalType: "bool",
                      name: "started",
                      type: "bool",
                    },
                    {
                      internalType: "bool",
                      name: "finished",
                      type: "bool",
                    },
                    {
                      internalType: "uint256",
                      name: "amountCollected",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct ChainWarzLottery.WeeklyJackpot",
                  name: "_jackpotBattle",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_normalizedRandomNumber",
                  type: "uint256",
                },
              ],
              name: "getWinnerAddressFromRandom",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
                {
                  internalType: "uint256[]",
                  name: "_amountOfEntries",
                  type: "uint256[]",
                },
                {
                  internalType: "address[]",
                  name: "_players",
                  type: "address[]",
                },
              ],
              name: "giveBatchEntriesForFree",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
              ],
              name: "injectFunds",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "injectorAddress",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_player",
                  type: "address",
                },
              ],
              name: "isBlackListed",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "jackpotBattleId",
              outputs: [
                {
                  internalType: "uint256",
                  name: "_value",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "operatorAddress",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_player",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_collection",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_tokenIdUsed",
                  type: "uint256",
                },
              ],
              name: "playerHasRequiredNFTs",
              outputs: [
                {
                  internalType: "bool",
                  name: "canBuy",
                  type: "bool",
                },
                {
                  internalType: "string",
                  name: "cause",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_player",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_amountOfEntries",
                  type: "uint256",
                },
              ],
              name: "playerReachedMaxEntries",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "requestId",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "randomness",
                  type: "uint256",
                },
              ],
              name: "rawFulfillRandomness",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "reserveFundAddress",
              outputs: [
                {
                  internalType: "address payable",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_fundManaderAddress",
                  type: "address",
                },
              ],
              name: "setFundManagerAddress",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_injectorAddress",
                  type: "address",
                },
              ],
              name: "setInjectorAddress",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_operatorAddress",
                  type: "address",
                },
              ],
              name: "setOperatorAddress",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address payable",
                  name: "_stakersAddress",
                  type: "address",
                },
              ],
              name: "setStakersAddress",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_stakersRewardBps",
                  type: "uint256",
                },
              ],
              name: "setStakersReward",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address payable",
                  name: "_treasuryAddress",
                  type: "address",
                },
              ],
              name: "setTreasuryAddress",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "stakersAddress",
              outputs: [
                {
                  internalType: "address payable",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "stakersReward",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_maxEntriesPerUser",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "id",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "numEntries",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "price",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct ChainWarzLottery.PriceStructure[]",
                  name: "_prices",
                  type: "tuple[]",
                },
                {
                  internalType: "uint256",
                  name: "_treasuryFeeInBps",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_weeklyJackpotBattleBps",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "_nftCollectionWhitelist",
                  type: "address[]",
                },
                {
                  internalType: "bool",
                  name: "_isJackpotBattle",
                  type: "bool",
                },
              ],
              name: "startBattle",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
              ],
              name: "transferRemainingFunds",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "treasuryAddress",
              outputs: [
                {
                  internalType: "address payable",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        FundManager: {
          address: "0xbB4C8D8FF04f40cd47dF5307E8a8C9FADE6e82dD",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "lotteryAddress",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "BalanceDecreasedByContract",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "newBalance",
                  type: "uint256",
                },
              ],
              name: "BalanceUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "previousAdminRole",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "newAdminRole",
                  type: "bytes32",
                },
              ],
              name: "RoleAdminChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "RoleGranted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "RoleRevoked",
              type: "event",
            },
            {
              stateMutability: "payable",
              type: "fallback",
            },
            {
              inputs: [],
              name: "CHAINWARZ_CONTRACT",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "DEFAULT_ADMIN_ROLE",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "decreaseBalanceByContract",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "deposit",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "getBalance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
              ],
              name: "getRoleAdmin",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "grantRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "hasRole",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "renounceRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "revokeRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        BlackListManager: {
          address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "previousAdminRole",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "newAdminRole",
                  type: "bytes32",
                },
              ],
              name: "RoleAdminChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "RoleGranted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "RoleRevoked",
              type: "event",
            },
            {
              inputs: [],
              name: "DEFAULT_ADMIN_ROLE",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "OPERATOR_ROLE",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_player",
                  type: "address",
                },
              ],
              name: "addToBlackList",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "blackList",
              outputs: [
                {
                  internalType: "bool",
                  name: "blacklisted",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "dateBlacklisted",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_player",
                  type: "address",
                },
              ],
              name: "getBlackListedDate",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
              ],
              name: "getRoleAdmin",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "grantRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "hasRole",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_player",
                  type: "address",
                },
              ],
              name: "isBlackListed",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_player",
                  type: "address",
                },
              ],
              name: "removeFromBlackList",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "renounceRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "revokeRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        ChainWarzLottery: {
          address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_blacklistManager",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_vrfCoordinator",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_linkToken",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_treasuryAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_operatorAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_injectorAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_reserveFundAddress",
                  type: "address",
                },
                {
                  internalType: "bytes32",
                  name: "_keyHash",
                  type: "bytes32",
                },
                {
                  internalType: "bool",
                  name: "_mainnetFee",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "battleId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amountCollected",
                  type: "uint256",
                },
              ],
              name: "BattleCancelled",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "requestId",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "battleId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amountCollected",
                  type: "uint256",
                },
              ],
              name: "BattleEnded",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "battleId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "injectedAmount",
                  type: "uint256",
                },
              ],
              name: "BattleInjection",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "battleId",
                  type: "uint256",
                },
              ],
              name: "BattleStarted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "battleId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amountOfEntriesCanceled",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "player",
                  type: "address",
                },
              ],
              name: "EntryCancelled",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "battleId",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "buyer",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "currentSize",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "priceStructureId",
                  type: "uint256",
                },
              ],
              name: "FightersPurchase",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "address[]",
                  name: "_players",
                  type: "address[]",
                },
                {
                  indexed: false,
                  internalType: "uint256[]",
                  name: "_numEntries",
                  type: "uint256[]",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "totalAmountOfEntries",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "currentSize",
                  type: "uint256",
                },
              ],
              name: "FreeEntry",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "battleId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "treasuryFee",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "weeklyJackpotBattleBps",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "stakersReward",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "winnerPrize",
                  type: "uint256",
                },
              ],
              name: "PrizeTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "randomNumber",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "normalizedRandomNumber",
                  type: "uint256",
                },
              ],
              name: "RandomNumberCreated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "battleId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amountInWeis",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "player",
                  type: "address",
                },
              ],
              name: "Refund",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "battleId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amountInWeis",
                  type: "uint256",
                },
              ],
              name: "RemainingFundsTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "newStakersReward",
                  type: "uint256",
                },
              ],
              name: "StakersRewardChanged",
              type: "event",
            },
            {
              inputs: [],
              name: "MAX_JACKPOT_BATTLE_CONTRIBUTION",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "MAX_TREASURY_FEE",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_priceId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_collection",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_tokenIdUsed",
                  type: "uint256",
                },
              ],
              name: "buyFighter",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_priceId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_collection",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_tokenIdUsed",
                  type: "uint256",
                },
              ],
              name: "buyFighterAndGetWeeklyFreeEntries",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
              ],
              name: "cancelBattle",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
                {
                  internalType: "uint256[]",
                  name: "_entriesToCancel",
                  type: "uint256[]",
                },
                {
                  internalType: "address",
                  name: "_player",
                  type: "address",
                },
              ],
              name: "cancelEntry",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
              ],
              name: "claimRefund",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
              ],
              name: "claimWeeklyFreeEntries",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_amountOfEntries",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_player",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "price",
                  type: "uint256",
                },
              ],
              name: "createEntries",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
              ],
              name: "endBattle",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "fundManaderAddress",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
              ],
              name: "getBattle",
              outputs: [
                {
                  components: [
                    {
                      internalType: "enum ChainWarzLottery.Status",
                      name: "status",
                      type: "uint8",
                    },
                    {
                      internalType: "uint256",
                      name: "maxEntries",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "winner",
                      type: "address",
                    },
                    {
                      internalType: "bool",
                      name: "isJackpotBattle",
                      type: "bool",
                    },
                    {
                      internalType: "uint256",
                      name: "randomNumber",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "amountCollected",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "treasuryFee",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "weeklyJackpotBattleBps",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "entriesLength",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "cancellingDate",
                      type: "uint256",
                    },
                    {
                      internalType: "address[]",
                      name: "nftCollectionWhitelist",
                      type: "address[]",
                    },
                  ],
                  internalType: "struct ChainWarzLottery.BattleStruct",
                  name: "battle",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getBattles",
              outputs: [
                {
                  components: [
                    {
                      internalType: "enum ChainWarzLottery.Status",
                      name: "status",
                      type: "uint8",
                    },
                    {
                      internalType: "uint256",
                      name: "maxEntries",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "winner",
                      type: "address",
                    },
                    {
                      internalType: "bool",
                      name: "isJackpotBattle",
                      type: "bool",
                    },
                    {
                      internalType: "uint256",
                      name: "randomNumber",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "amountCollected",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "treasuryFee",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "weeklyJackpotBattleBps",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "entriesLength",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "cancellingDate",
                      type: "uint256",
                    },
                    {
                      internalType: "address[]",
                      name: "nftCollectionWhitelist",
                      type: "address[]",
                    },
                  ],
                  internalType: "struct ChainWarzLottery.BattleStruct[]",
                  name: "_battles",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_requestId",
                  type: "bytes32",
                },
              ],
              name: "getChainlinkBattleInfo",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "id",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "size",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct ChainWarzLottery.BattleInfo",
                  name: "_battleInfo",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_player",
                  type: "address",
                },
              ],
              name: "getClaimData",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "numEntriesPerUser",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "amountSpentInWeis",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "claimed",
                      type: "bool",
                    },
                  ],
                  internalType: "struct ChainWarzLottery.ClaimData",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
              ],
              name: "getEntries",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "currentEntriesLength",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "player",
                      type: "address",
                    },
                  ],
                  internalType: "struct ChainWarzLottery.Entries[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
              ],
              name: "getEntriesList",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "currentEntriesLength",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "player",
                      type: "address",
                    },
                  ],
                  internalType: "struct ChainWarzLottery.Entries[]",
                  name: "_entries",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
              ],
              name: "getIsFreeEntryClaimed",
              outputs: [
                {
                  internalType: "bool",
                  name: "_claimed",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
              ],
              name: "getPrices",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "id",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "numEntries",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "price",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct ChainWarzLottery.PriceStructure[5]",
                  name: "_prices",
                  type: "tuple[5]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_requiredNFTHash",
                  type: "bytes32",
                },
              ],
              name: "getRequiredNFTWallet",
              outputs: [
                {
                  internalType: "address",
                  name: "_address",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_jackpotBattleId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
              ],
              name: "getWeeklyFreeEntries",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint128",
                      name: "freeEntries",
                      type: "uint128",
                    },
                    {
                      internalType: "bool",
                      name: "claimed",
                      type: "bool",
                    },
                  ],
                  internalType: "struct ChainWarzLottery.FreeEntries",
                  name: "_freeEntries",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_jackpotBattleId",
                  type: "uint256",
                },
              ],
              name: "getWeeklyJackpotBattle",
              outputs: [
                {
                  components: [
                    {
                      internalType: "bool",
                      name: "started",
                      type: "bool",
                    },
                    {
                      internalType: "bool",
                      name: "finished",
                      type: "bool",
                    },
                    {
                      internalType: "uint256",
                      name: "amountCollected",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct ChainWarzLottery.WeeklyJackpot",
                  name: "_jackpotBattle",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_normalizedRandomNumber",
                  type: "uint256",
                },
              ],
              name: "getWinnerAddressFromRandom",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
                {
                  internalType: "uint256[]",
                  name: "_amountOfEntries",
                  type: "uint256[]",
                },
                {
                  internalType: "address[]",
                  name: "_players",
                  type: "address[]",
                },
              ],
              name: "giveBatchEntriesForFree",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
              ],
              name: "injectFunds",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "injectorAddress",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_player",
                  type: "address",
                },
              ],
              name: "isBlackListed",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "jackpotBattleId",
              outputs: [
                {
                  internalType: "uint256",
                  name: "_value",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "operatorAddress",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_player",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_collection",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_tokenIdUsed",
                  type: "uint256",
                },
              ],
              name: "playerHasRequiredNFTs",
              outputs: [
                {
                  internalType: "bool",
                  name: "canBuy",
                  type: "bool",
                },
                {
                  internalType: "string",
                  name: "cause",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_player",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_amountOfEntries",
                  type: "uint256",
                },
              ],
              name: "playerReachedMaxEntries",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "requestId",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "randomness",
                  type: "uint256",
                },
              ],
              name: "rawFulfillRandomness",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "reserveFundAddress",
              outputs: [
                {
                  internalType: "address payable",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_fundManaderAddress",
                  type: "address",
                },
              ],
              name: "setFundManagerAddress",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_injectorAddress",
                  type: "address",
                },
              ],
              name: "setInjectorAddress",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_operatorAddress",
                  type: "address",
                },
              ],
              name: "setOperatorAddress",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address payable",
                  name: "_stakersAddress",
                  type: "address",
                },
              ],
              name: "setStakersAddress",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_stakersRewardBps",
                  type: "uint256",
                },
              ],
              name: "setStakersReward",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address payable",
                  name: "_treasuryAddress",
                  type: "address",
                },
              ],
              name: "setTreasuryAddress",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "stakersAddress",
              outputs: [
                {
                  internalType: "address payable",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "stakersReward",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_maxEntriesPerUser",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "id",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "numEntries",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "price",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct ChainWarzLottery.PriceStructure[]",
                  name: "_prices",
                  type: "tuple[]",
                },
                {
                  internalType: "uint256",
                  name: "_treasuryFeeInBps",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_weeklyJackpotBattleBps",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "_nftCollectionWhitelist",
                  type: "address[]",
                },
                {
                  internalType: "bool",
                  name: "_isJackpotBattle",
                  type: "bool",
                },
              ],
              name: "startBattle",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_battleId",
                  type: "uint256",
                },
              ],
              name: "transferRemainingFunds",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "treasuryAddress",
              outputs: [
                {
                  internalType: "address payable",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        FundManager: {
          address: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "lotteryAddress",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "BalanceDecreasedByContract",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "newBalance",
                  type: "uint256",
                },
              ],
              name: "BalanceUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "previousAdminRole",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "newAdminRole",
                  type: "bytes32",
                },
              ],
              name: "RoleAdminChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "RoleGranted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "RoleRevoked",
              type: "event",
            },
            {
              stateMutability: "payable",
              type: "fallback",
            },
            {
              inputs: [],
              name: "CHAINWARZ_CONTRACT",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "DEFAULT_ADMIN_ROLE",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "decreaseBalanceByContract",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "deposit",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "getBalance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
              ],
              name: "getRoleAdmin",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "grantRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "hasRole",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "renounceRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "revokeRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
        LinkToken: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              inputs: [],
              name: "DOMAIN_SEPARATOR",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "allowance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "nonces",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  internalType: "uint8",
                  name: "v",
                  type: "uint8",
                },
                {
                  internalType: "bytes32",
                  name: "r",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "s",
                  type: "bytes32",
                },
              ],
              name: "permit",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transfer",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_value",
                  type: "uint256",
                },
                {
                  internalType: "bytes",
                  name: "_data",
                  type: "bytes",
                },
              ],
              name: "transferAndCall",
              outputs: [
                {
                  internalType: "bool",
                  name: "success",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        MockOracle: {
          address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_link",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "requestId",
                  type: "bytes32",
                },
              ],
              name: "CancelOracleRequest",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "specId",
                  type: "bytes32",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "requester",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "bytes32",
                  name: "requestId",
                  type: "bytes32",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "payment",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "callbackAddr",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "bytes4",
                  name: "callbackFunctionId",
                  type: "bytes4",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "cancelExpiration",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "dataVersion",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              name: "OracleRequest",
              type: "event",
            },
            {
              inputs: [],
              name: "EXPIRY_TIME",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_requestId",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "_payment",
                  type: "uint256",
                },
                {
                  internalType: "bytes4",
                  name: "",
                  type: "bytes4",
                },
                {
                  internalType: "uint256",
                  name: "_expiration",
                  type: "uint256",
                },
              ],
              name: "cancelOracleRequest",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_requestId",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "_data",
                  type: "bytes32",
                },
              ],
              name: "fulfillOracleRequest",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "getChainlinkToken",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_sender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
                {
                  internalType: "bytes",
                  name: "_data",
                  type: "bytes",
                },
              ],
              name: "onTokenTransfer",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_sender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_payment",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "_specId",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "_callbackAddress",
                  type: "address",
                },
                {
                  internalType: "bytes4",
                  name: "_callbackFunctionId",
                  type: "bytes4",
                },
                {
                  internalType: "uint256",
                  name: "_nonce",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_dataVersion",
                  type: "uint256",
                },
                {
                  internalType: "bytes",
                  name: "_data",
                  type: "bytes",
                },
              ],
              name: "oracleRequest",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        VRFCoordinatorMock: {
          address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "linkAddress",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "keyHash",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "seed",
                  type: "uint256",
                },
              ],
              name: "RandomnessRequest",
              type: "event",
            },
            {
              inputs: [],
              name: "LINK",
              outputs: [
                {
                  internalType: "contract LinkTokenInterface",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "requestId",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "randomness",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "consumerContract",
                  type: "address",
                },
              ],
              name: "callBackWithRandomness",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "fee",
                  type: "uint256",
                },
                {
                  internalType: "bytes",
                  name: "_data",
                  type: "bytes",
                },
              ],
              name: "onTokenTransfer",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
