// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import {BaseSetup} from "./BaseSetup.t.sol";
import "../../contracts/Lottery/ChainWarzLottery.sol";

contract TransferRemainingFundsTest is BaseSetup {
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

    function testTransferRemainingFunds() public {
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

        vm.warp(31 days);

        uint256 beforeTreasuryBalance = treasuryWallet.balance;

        vm.startPrank(operator);
        chainWarzLottery.transferRemainingFunds(battleId);
        vm.stopPrank();

        battle = chainWarzLottery.getBattle(battleId);

        assertEq(treasuryWallet.balance, beforeTreasuryBalance + ticketPrices[0]);
        assertEq(battle.amountCollected, 0);
    }

    function testRevertIfClaimBefore30Days() public {
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

        vm.startPrank(operator);
        vm.expectRevert(abi.encodePacked("claim too soon"));
        chainWarzLottery.transferRemainingFunds(battleId);
        vm.stopPrank();
    }

    function testOnlyOperatorCanCall() public {
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
        vm.expectRevert(abi.encodePacked("Not operator"));

        chainWarzLottery.transferRemainingFunds(battleId);
        vm.stopPrank();
    }
}
