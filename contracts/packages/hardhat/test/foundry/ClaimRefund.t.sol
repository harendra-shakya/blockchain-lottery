// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import {BaseSetup} from "./BaseSetup.t.sol";
import "../../contracts/Lottery/ChainWarzLottery.sol";

contract ClaimRefundTest is BaseSetup {
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

    function testClaimRefund() public {
        this.setUp();
        address payable[] memory users = createUsers(1);

        vm.startPrank(users[0]);
        uint battleId = 0;
        uint id = 1;
        address collection = address(0);
        uint tokenIdUsed = 0;
        chainWarzLottery.buyFighter{value: ticketPrices[0]}(battleId, id, collection, tokenIdUsed);
        vm.stopPrank();

        vm.startPrank(operator);
        chainWarzLottery.cancelBattle(battleId);
        vm.stopPrank();

        assertEq(users[0].balance, (userInitialBalance - ticketPrices[0]));

        ChainWarzLottery.BattleStruct memory battle = chainWarzLottery.getBattle(battleId);
        uint256 beforeAmountCollected = battle.amountCollected;

        vm.startPrank(users[0]);
        chainWarzLottery.claimRefund(battleId);

        battle = chainWarzLottery.getBattle(battleId);
        ChainWarzLottery.ClaimData memory data = chainWarzLottery.getClaimData(battleId, users[0]);

        assertEq(users[0].balance, userInitialBalance);
        assertEq(beforeAmountCollected, battle.amountCollected + data.amountSpentInWeis);
        vm.stopPrank();
    }

    function testRevertIfMoreThan30Days() public {
        this.setUp();
        address payable[] memory users = createUsers(1);

        vm.startPrank(users[0]);
        uint battleId = 0;
        uint id = 1;
        address collection = address(0);
        uint tokenIdUsed = 0;
        chainWarzLottery.buyFighter{value: ticketPrices[0]}(battleId, id, collection, tokenIdUsed);
        vm.stopPrank();

        vm.startPrank(operator);
        chainWarzLottery.cancelBattle(battleId);
        vm.stopPrank();

        assertEq(users[0].balance, (userInitialBalance - ticketPrices[0]));

        vm.warp(31 days);

        vm.startPrank(users[0]);
        vm.expectRevert(abi.encodePacked("claim time expired"));
        chainWarzLottery.claimRefund(battleId);
        vm.stopPrank();
    }

    function testRevertIfAlreadyRefunded() public {
        this.setUp();
        address payable[] memory users = createUsers(1);

        vm.startPrank(users[0]);
        uint battleId = 0;
        uint id = 1;
        address collection = address(0);
        uint tokenIdUsed = 0;
        chainWarzLottery.buyFighter{value: ticketPrices[0]}(battleId, id, collection, tokenIdUsed);
        vm.stopPrank();

        vm.startPrank(operator);
        chainWarzLottery.cancelBattle(battleId);
        vm.stopPrank();

        assertEq(users[0].balance, (userInitialBalance - ticketPrices[0]));

        vm.startPrank(users[0]);
        chainWarzLottery.claimRefund(battleId);
        vm.expectRevert(abi.encodePacked("already refunded"));
        chainWarzLottery.claimRefund(battleId);
        vm.stopPrank();
    }
}
