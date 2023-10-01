// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "../../contracts/test/LinkToken.sol";
import "../../contracts/Lottery/BlackListManager.sol";
import "../../contracts/test/MockOracle.sol";
import "../../contracts/Lottery/ChainWarzLottery.sol";
import "../../contracts/test/VRFCoordinatorMock.sol";
import "../../contracts/test/NFT.sol";
import "../../contracts/test/MockChainWarzLottery.sol";
import "../../contracts/Lottery/FundManager.sol";

contract BaseSetup is Test {
    MockChainWarzLottery public chainWarzLottery;
    FundManager public fundManager;
    LinkToken public linkToken;
    BlackListManager public blacklistManager;
    MockOracle public mockOracle;
    VRFCoordinatorMock public vrfCoordinatorMock;
    NFT public nft;

    address public owner = address(0x1);
    address public operator = address(0x2);
    address public treasuryWallet = address(0x3);
    address public injector = address(0x4);
    address public stakersAddress = address(0x5);
    address public reserveFundAddress = address(0x6);

    address public randomUser = address(0x7);

    bytes32 public keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
    bool public mainnetFee = false;

    uint[5] public ticketPrices = [0.008 ether, 0.08 ether, 0.1 ether, 0.5 ether, 0.8 ether];
    uint[5] public ticketEntries = [1, 5, 15, 50, 100];

    uint userInitialBalance = 1 ether;

    function setUp() public virtual {
        vm.startPrank(owner);
        linkToken = new LinkToken();
        mockOracle = new MockOracle(address(linkToken));
        vrfCoordinatorMock = new VRFCoordinatorMock(address(linkToken));
        blacklistManager = new BlackListManager();
        chainWarzLottery = new MockChainWarzLottery(
            address(blacklistManager),
            address(vrfCoordinatorMock),
            address(linkToken),
            treasuryWallet,
            operator,
            injector,
            reserveFundAddress,
            keyHash,
            mainnetFee
        );
        chainWarzLottery.setStakersAddress(payable(stakersAddress));

        fundManager = new FundManager(address(chainWarzLottery));
        chainWarzLottery.setFundManagerAddress(address(fundManager));

        nft = new NFT();
        vm.stopPrank();
    }

    function startBattle(
        address _user,
        uint maxEntries,
        uint treasuryFeeInBps,
        uint weeklyJackpotBattleInBps,
        address[] memory nftCollectionWhitelist,
        bool isJackpotBattle
    ) public {
        vm.startPrank(_user);

        ChainWarzLottery.PriceStructure[5] memory fixedArray = [
            ChainWarzLottery.PriceStructure({id: 1, numEntries: ticketEntries[0], price: ticketPrices[0]}),
            ChainWarzLottery.PriceStructure({id: 2, numEntries: ticketEntries[1], price: ticketPrices[1]}),
            ChainWarzLottery.PriceStructure({id: 3, numEntries: ticketEntries[2], price: ticketPrices[2]}),
            ChainWarzLottery.PriceStructure({id: 4, numEntries: ticketEntries[3], price: ticketPrices[3]}),
            ChainWarzLottery.PriceStructure({id: 5, numEntries: ticketEntries[4], price: ticketPrices[4]})
        ];
        ChainWarzLottery.PriceStructure[] memory prices = new ChainWarzLottery.PriceStructure[](fixedArray.length);
        for (uint i = 0; i < fixedArray.length; i++) {
            prices[i] = fixedArray[i];
        }

        chainWarzLottery.startBattle(
            maxEntries,
            prices,
            treasuryFeeInBps,
            weeklyJackpotBattleInBps,
            nftCollectionWhitelist,
            isJackpotBattle
        );

        vm.stopPrank();
    }

    function endBattle(uint256 battleId) internal {
        uint256 beforeTreasuryBalance = treasuryWallet.balance;
        uint256 beforeStakersBalance = stakersAddress.balance;
        uint256 beforeJackpotBalance = chainWarzLottery
            .getWeeklyJackpotBattle(chainWarzLottery.jackpotBattleId())
            .amountCollected;
        uint256 beforeReserveFundBalance = reserveFundAddress.balance;
        uint256 finalJackpotBalance = chainWarzLottery
            .getWeeklyJackpotBattle(chainWarzLottery.jackpotBattleId())
            .amountCollected;

        vm.startPrank(owner);
        linkToken.transfer(address(chainWarzLottery), 1 ether);
        vm.stopPrank();

        vm.startPrank(operator);

        chainWarzLottery.endBattle(battleId);

        ChainWarzLottery.BattleStruct memory battle = chainWarzLottery.getBattle(battleId);

        // request random num
        bytes32 requestId = chainWarzLottery.getRandomNum(battleId, battle.entriesLength);

        ChainWarzLottery.BattleInfo memory battleInfo = chainWarzLottery.getChainlinkBattleInfo(requestId);

        assertEq(battleInfo.id, battleId);
        assertEq(battleInfo.size, battle.entriesLength);

        // fulfill
        chainWarzLottery.fulfillRandom(requestId, 19000000000000);

        battle = chainWarzLottery.getBattle(battleId);

        vm.stopPrank();

        uint256 treasuryFee = (battle.amountCollected * battle.treasuryFee) / 10000;
        uint256 reserveFundAmount = (battle.amountCollected * battle.weeklyJackpotBattleBps) / 10000;
        uint256 stakersReward = (battle.amountCollected * chainWarzLottery.stakersReward()) / 10000;
        uint256 winnerPrize = (battle.amountCollected - (treasuryFee + reserveFundAmount + stakersReward));
        uint256 beforeUserBalance = userInitialBalance - ticketPrices[0];
        uint256 currentJackpotBalance = chainWarzLottery
            .getWeeklyJackpotBattle(chainWarzLottery.jackpotBattleId())
            .amountCollected;

        assertGt(treasuryFee, 0);
        assertGt(stakersReward, 0);
        assertGt(winnerPrize, 0);
        assertGt(treasuryWallet.balance, 0);
        assertGt(stakersAddress.balance, 0);
        assertGt(battle.winner.balance, 0);
        assertGt(beforeUserBalance, 0);
        assertGt(battle.winner.balance, beforeUserBalance);
        assertEq(treasuryFee, treasuryWallet.balance - beforeTreasuryBalance);
        assertEq(stakersReward, stakersAddress.balance - beforeStakersBalance);

        if (battle.isJackpotBattle) {
            winnerPrize += finalJackpotBalance;
            assertGt(chainWarzLottery.jackpotBattleId(), 0);
            assertGt(reserveFundAmount, 0);
            assertGt(reserveFundAddress.balance, 0);
            assertEq(reserveFundAmount, reserveFundAddress.balance - beforeReserveFundBalance);
            assertEq(winnerPrize, battle.winner.balance - beforeUserBalance);
        } else {
            assertEq(reserveFundAmount, currentJackpotBalance - beforeJackpotBalance);
            assertEq(winnerPrize, battle.winner.balance - beforeUserBalance);
        }
    }

    function startAndEnd(uint battleId, address payable[] memory users, bool isJackpotBattle) public {
        uint maxEntries;
        uint treasuryFeeInBps = 500; // 5%
        uint weeklyJackpotBattleInBps = 500;
        address[] memory nftCollectionWhitelist;

        startBattle(
            operator,
            maxEntries,
            treasuryFeeInBps,
            weeklyJackpotBattleInBps,
            nftCollectionWhitelist,
            isJackpotBattle
        );

        multipleEntries(battleId, users);

        endBattle(battleId);
    }

    function buyFighter(address _user, uint battleId, uint priceId, address collection, uint tokenIdUsed) public {
        vm.startPrank(_user);
        vm.deal(_user, userInitialBalance);

        chainWarzLottery.buyFighter{value: ticketPrices[priceId - 1]}(battleId, priceId, collection, tokenIdUsed);

        // ChainWarzLottery.ClaimData memory data = chainWarzLottery.getClaimData(battleId - 1, users[0]);

        // assertEq(data.numEntriesPerUser, 1);

        vm.stopPrank();
    }

    function multipleEntries(uint battleId, address payable[] memory users) public {
        uint priceId = 1;
        address collection = address(0);
        uint tokenIdUsed = 0;

        for (uint i; i < users.length; i++) {
            buyFighter(users[i], battleId, priceId, collection, tokenIdUsed);
        }
    }

    //create users with 100 ether balance
    function createUsers(uint256 userNum) public returns (address payable[] memory) {
        address payable[] memory _users = new address payable[](userNum);
        for (uint256 i = 0; i < userNum; i++) {
            address payable _user = this.getNextUserAddress();
            vm.deal(_user, userInitialBalance);
            _users[i] = _user;
        }
        return _users;
    }

    bytes32 internal nextUser = keccak256(abi.encodePacked("user address"));

    function getNextUserAddress() public returns (address payable) {
        //bytes32 to address conversion
        address payable user = payable(address(uint160(uint256(nextUser))));
        nextUser = keccak256(abi.encodePacked(nextUser));
        return user;
    }

    //move block.number forward by a given number of blocks
    function mineBlocks(uint256 numBlocks) public {
        uint256 targetBlock = block.number + numBlocks;
        vm.roll(targetBlock);
    }
}
