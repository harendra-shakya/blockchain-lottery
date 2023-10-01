// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import {BaseSetup} from "./BaseSetup.t.sol";
import "../../contracts/Lottery/ChainWarzLottery.sol";

contract ClaimFreeEntriesTest is BaseSetup {
    function setUp() public virtual override {
        BaseSetup.setUp();
    }

    function testClaimFreeEntries() public {
        this.setUp();
        uint maxEntries = 0;
        uint treasuryFeeInBps = 500; // 5%
        uint weeklyJackpotBattleInBps = 500;
        address[] memory nftCollectionWhitelist;
        bool isJackpotBattle = false;

        address payable[] memory users = createUsers(100);
        uint battleId;

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

        ChainWarzLottery.ClaimData memory data = chainWarzLottery.getClaimData(battleId - 1, users[0]);
        assertEq(data.numEntriesPerUser, 1);

        // 6
        startAndEnd(battleId, users, isJackpotBattle);
        ++battleId;

        ChainWarzLottery.FreeEntries memory freeEntriesStruct = chainWarzLottery.getWeeklyFreeEntries(
            chainWarzLottery.jackpotBattleId(),
            users[0]
        );

        assertEq(freeEntriesStruct.freeEntries, 6);

        startBattle(operator, maxEntries, treasuryFeeInBps, weeklyJackpotBattleInBps, nftCollectionWhitelist, true);
        data = chainWarzLottery.getClaimData(battleId, users[0]);
        assertEq(data.numEntriesPerUser, 0);

        freeEntriesStruct = chainWarzLottery.getWeeklyFreeEntries(chainWarzLottery.jackpotBattleId(), users[0]);

        assertEq(freeEntriesStruct.freeEntries, 6);

        vm.startPrank(users[0]);
        chainWarzLottery.claimWeeklyFreeEntries(battleId);
        vm.stopPrank();

        data = chainWarzLottery.getClaimData(battleId, users[0]);
        assertEq(data.numEntriesPerUser, 6);
        multipleEntries(battleId, users);

        endBattle(battleId);

        // * Resets

        freeEntriesStruct = chainWarzLottery.getWeeklyFreeEntries(chainWarzLottery.jackpotBattleId(), users[0]);

        assertEq(freeEntriesStruct.freeEntries, 0);
    }

    function testRevertIfNotAJackpotBattle() public {
        this.setUp();
        uint maxEntries = 0;
        uint treasuryFeeInBps = 500; // 5%
        uint weeklyJackpotBattleInBps = 500;
        address[] memory nftCollectionWhitelist;
        bool isJackpotBattle = false;

        address payable[] memory users = createUsers(2);
        uint battleId;

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

        startBattle(
            operator,
            maxEntries,
            treasuryFeeInBps,
            weeklyJackpotBattleInBps,
            nftCollectionWhitelist,
            isJackpotBattle
        );

        vm.startPrank(users[0]);
        vm.expectRevert(abi.encodePacked("Not a Jackpot Battle"));
        chainWarzLottery.claimWeeklyFreeEntries(battleId);
        vm.stopPrank();
    }

    function testRevertIfAlreadyClaimed() public {
        this.setUp();
        uint maxEntries = 0;
        uint treasuryFeeInBps = 500; // 5%
        uint weeklyJackpotBattleInBps = 500;
        address[] memory nftCollectionWhitelist;
        bool isJackpotBattle = false;

        address payable[] memory users = createUsers(2);
        uint battleId;

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

        startBattle(operator, maxEntries, treasuryFeeInBps, weeklyJackpotBattleInBps, nftCollectionWhitelist, true);

        vm.startPrank(users[0]);
        chainWarzLottery.claimWeeklyFreeEntries(battleId);
        vm.expectRevert(abi.encodePacked("Free entries already claimed"));
        chainWarzLottery.claimWeeklyFreeEntries(battleId);
        vm.stopPrank();
    }
}
