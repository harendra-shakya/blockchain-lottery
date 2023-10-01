// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import {BaseSetup} from "./BaseSetup.t.sol";
import "../../contracts/Lottery/ChainWarzLottery.sol";

contract EndBattleTest is BaseSetup {
    function setUp() public virtual override {
        BaseSetup.setUp();
        uint maxEntries = 0;
        uint treasuryFeeInBps = 500; // 5%
        uint weeklyJackpotBattleInBps = 500;
        address[] memory nftCollectionWhitelist;
        bool isJackpotBattle = false;

        startBattle(
            operator,
            maxEntries,
            treasuryFeeInBps,
            weeklyJackpotBattleInBps,
            nftCollectionWhitelist,
            isJackpotBattle
        );
    }

    function testEndBattle() public {
        BaseSetup.setUp();
        uint maxEntries = 0;
        uint treasuryFeeInBps = 500; // 5%
        uint weeklyJackpotBattleInBps = 500;
        address[] memory nftCollectionWhitelist;
        bool isJackpotBattle = false;
        address payable[] memory users = createUsers(100);
        uint256 battleId;

        startBattle(
            operator,
            maxEntries,
            treasuryFeeInBps,
            weeklyJackpotBattleInBps,
            nftCollectionWhitelist,
            isJackpotBattle
        );

        multipleEntries(battleId, users);

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

        address winner = chainWarzLottery.getWinnerAddressFromRandom(battleId, battle.randomNumber);

        battle = chainWarzLottery.getBattle(battleId);

        assertEq(battle.winner, winner);

        uint256 treasuryFee = (battle.amountCollected * battle.treasuryFee) / 10000;

        uint256 weeklyJackpotAmount = (battle.amountCollected * battle.weeklyJackpotBattleBps) / 10000;

        uint256 stakersReward = (battle.amountCollected * chainWarzLottery.stakersReward()) / 10000;

        uint256 winnerPrize = (battle.amountCollected - (treasuryFee + weeklyJackpotAmount + stakersReward));

        // Noraml Dat battle assertion

        assertGt(treasuryFee, 0);
        assertGt(weeklyJackpotAmount, 0);
        assertGt(stakersReward, 0);
        assertGt(winner.balance, 0);

        assertEq(chainWarzLottery.jackpotBattleId(), 0);
        assertEq(treasuryFee, treasuryWallet.balance);
        assertEq(
            weeklyJackpotAmount,
            chainWarzLottery.getWeeklyJackpotBattle(chainWarzLottery.jackpotBattleId()).amountCollected
        );
        assertEq(stakersReward, stakersAddress.balance);
        // 1 eth - initial bal, 0.008 ticket price
        assertEq(winner.balance, winnerPrize + (userInitialBalance - ticketPrices[0]));

        vm.stopPrank();
    }

    function testWeekly() public {
        BaseSetup.setUp();
        uint maxEntries = 0;
        uint treasuryFeeInBps = 500; // 5%
        uint weeklyJackpotBattleInBps = 500;
        address[] memory nftCollectionWhitelist;
        bool isJackpotBattle = true;
        address payable[] memory users = createUsers(100);

        uint256 battleId;

        startBattle(
            operator,
            maxEntries,
            treasuryFeeInBps,
            weeklyJackpotBattleInBps,
            nftCollectionWhitelist,
            isJackpotBattle
        );

        multipleEntries(battleId, users);

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

        address winner = chainWarzLottery.getWinnerAddressFromRandom(battleId, battle.randomNumber);

        battle = chainWarzLottery.getBattle(battleId);

        assertEq(battle.winner, winner);

        uint256 treasuryFee = (battle.amountCollected * battle.treasuryFee) / 10000;

        uint256 reserveFundAmount = (battle.amountCollected * battle.weeklyJackpotBattleBps) / 10000;

        uint256 stakersReward = (battle.amountCollected * chainWarzLottery.stakersReward()) / 10000;

        uint256 winnerPrize = (battle.amountCollected - (treasuryFee + reserveFundAmount + stakersReward));

        if (isJackpotBattle) {
            winnerPrize += chainWarzLottery.getWeeklyJackpotBattle(chainWarzLottery.jackpotBattleId()).amountCollected;
        }

        assertEq(chainWarzLottery.jackpotBattleId(), 1);
        assertEq(treasuryFee, treasuryWallet.balance);
        assertEq(reserveFundAmount, reserveFundAddress.balance);
        assertEq(stakersReward, stakersAddress.balance);
        assertEq(winner.balance, winnerPrize + (userInitialBalance - ticketPrices[0]));

        assertGt(treasuryFee, 0);
        assertGt(reserveFundAmount, 0);
        assertGt(stakersReward, 0);
        assertGt(winner.balance, 0);
        vm.stopPrank();
    }

    function testWeeklyMulti() public {
        BaseSetup.setUp();
        bool isJackpotBattle = false;
        address payable[] memory users = createUsers(100);

        uint256 battleId;

        // 1
        startAndEnd(battleId, users, isJackpotBattle);

        ++battleId;

        // 2
        startAndEnd(battleId, users, isJackpotBattle);
        ++battleId;

        // 3
        startAndEnd(battleId, users, isJackpotBattle);
        ++battleId;

        // 4
        startAndEnd(battleId, users, isJackpotBattle);
        ++battleId;

        // 5
        startAndEnd(battleId, users, isJackpotBattle);
        ++battleId;

        // 6
        startAndEnd(battleId, users, isJackpotBattle);
        ++battleId;

        isJackpotBattle = true;

        // 7
        startAndEnd(battleId, users, isJackpotBattle);
        ++battleId;

        isJackpotBattle = false;

        // 1
        startAndEnd(battleId, users, isJackpotBattle);

        ++battleId;

        // 2
        startAndEnd(battleId, users, isJackpotBattle);
        ++battleId;

        // 3
        startAndEnd(battleId, users, isJackpotBattle);
        ++battleId;

        // 4
        startAndEnd(battleId, users, isJackpotBattle);
        ++battleId;

        // 5
        startAndEnd(battleId, users, isJackpotBattle);
        ++battleId;

        // 6
        startAndEnd(battleId, users, isJackpotBattle);
        ++battleId;

        isJackpotBattle = true;

        // 7
        startAndEnd(battleId, users, isJackpotBattle);
        ++battleId;
    }

    function testRevertIfContractDontHaveEnoughLink() public {
        this.setUp();

        vm.startPrank(owner);
        vm.stopPrank();

        vm.startPrank(operator);
        vm.expectRevert(abi.encodePacked("Not enough LINK"));
        chainWarzLottery.endBattle(0);
        vm.stopPrank();
    }
}
