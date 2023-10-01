// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import {BaseSetup} from "./BaseSetup.t.sol";
import "../../contracts/Lottery/ChainWarzLottery.sol";

contract StartBattleTest is BaseSetup {
    function setUp() public virtual override {
        BaseSetup.setUp();
    }

    function testStartBattle() public {
        this.setUp();

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

    function testFuzzingStartBattle(
        uint maxEntries,
        uint treasuryFeeInBps,
        uint weeklyJackpotBattleInBps,
        address[] memory nftCollectionWhitelist,
        bool isJackpotBattle
    ) public {
        vm.assume(treasuryFeeInBps < 1000 && weeklyJackpotBattleInBps < 1000);

        startBattle(
            operator,
            maxEntries,
            treasuryFeeInBps,
            weeklyJackpotBattleInBps,
            nftCollectionWhitelist,
            isJackpotBattle
        );

        ChainWarzLottery.BattleStruct memory battle = chainWarzLottery.getBattle(0);

        assertEq(battle.maxEntries, maxEntries);
        assertEq(battle.winner, address(0));
        assertEq(battle.randomNumber, 0);
        assertEq(battle.amountCollected, 0);
        assertEq(battle.treasuryFee, treasuryFeeInBps);
        assertEq(battle.weeklyJackpotBattleBps, weeklyJackpotBattleInBps);
        assertEq(battle.entriesLength, 0);
        assertEq(battle.cancellingDate, 0);
        assertEq(battle.nftCollectionWhitelist, nftCollectionWhitelist);
    }

    function testInitializesBatlleStruct() public {
        this.setUp();

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

        ChainWarzLottery.BattleStruct memory battle = chainWarzLottery.getBattle(0);

        assertEq(battle.maxEntries, maxEntries);
        assertEq(battle.winner, address(0));
        assertEq(battle.randomNumber, 0);
        assertEq(battle.amountCollected, 0);
        assertEq(battle.treasuryFee, treasuryFeeInBps);
        assertEq(battle.weeklyJackpotBattleBps, weeklyJackpotBattleInBps);
        assertEq(battle.entriesLength, 0);
        assertEq(battle.cancellingDate, 0);
        assertEq(battle.nftCollectionWhitelist, nftCollectionWhitelist);
    }

    function testInitializesWeeklyBatlleStruct() public {
        this.setUp();

        uint maxEntries;
        uint treasuryFeeInBps = 500; // 5%
        uint weeklyJackpotBattleInBps = 500;
        address[] memory nftCollectionWhitelist;
        bool isJackpotBattle = false;
        uint battleId;
        address payable[] memory users = createUsers(100);

        startBattle(
            operator,
            maxEntries,
            treasuryFeeInBps,
            weeklyJackpotBattleInBps,
            nftCollectionWhitelist,
            isJackpotBattle
        );

        multipleEntries(battleId, users);

        ChainWarzLottery.BattleStruct memory battle = chainWarzLottery.getBattle(battleId);

        endBattle(battleId);

        ++battleId;

        startBattle(operator, maxEntries, treasuryFeeInBps, weeklyJackpotBattleInBps, nftCollectionWhitelist, true);

        ChainWarzLottery.WeeklyJackpot memory weeklyBattle = chainWarzLottery.getWeeklyJackpotBattle(
            chainWarzLottery.jackpotBattleId()
        );

        assertTrue(weeklyBattle.started);
        assertEq(weeklyBattle.amountCollected, (battle.amountCollected * battle.weeklyJackpotBattleBps) / 10000);
        assertGt(weeklyBattle.amountCollected, 0);
    }

    function testOnlyOperatorCanCall() public {
        this.setUp();

        uint maxEntries = 0;
        uint treasuryFeeInBps = 500; // 5%
        uint weeklyJackpotBattleInBps = 500;
        address[] memory nftCollectionWhitelist;
        bool isJackpotBattle = false;
        address payable[] memory users = createUsers(1);

        vm.expectRevert(abi.encodePacked("Not operator"));
        startBattle(
            owner,
            maxEntries,
            treasuryFeeInBps,
            weeklyJackpotBattleInBps,
            nftCollectionWhitelist,
            isJackpotBattle
        );

        vm.expectRevert(abi.encodePacked("Not operator"));
        startBattle(
            users[0],
            maxEntries,
            treasuryFeeInBps,
            weeklyJackpotBattleInBps,
            nftCollectionWhitelist,
            isJackpotBattle
        );
    }

    function testRevertIfMoreThanMaxFee() public {
        this.setUp();

        uint maxEntries = 0;
        uint treasuryFeeInBps = 500; // 5%
        uint weeklyJackpotBattleInBps = 500;
        address[] memory nftCollectionWhitelist;
        bool isJackpotBattle = false;

        vm.expectRevert(abi.encodePacked("treasury fee too high"));
        startBattle(operator, maxEntries, 3000, weeklyJackpotBattleInBps, nftCollectionWhitelist, isJackpotBattle);

        vm.expectRevert(abi.encodePacked("WB contribution too high"));
        startBattle(operator, maxEntries, treasuryFeeInBps, 3000, nftCollectionWhitelist, isJackpotBattle);
    }

    function testRevertIfTwoJackpotBattle() public {
        this.setUp();

        uint maxEntries = 0;
        uint treasuryFeeInBps = 500; // 5%
        uint weeklyJackpotBattleInBps = 500;
        address[] memory nftCollectionWhitelist;
        bool isJackpotBattle = true;

        startBattle(
            operator,
            maxEntries,
            treasuryFeeInBps,
            weeklyJackpotBattleInBps,
            nftCollectionWhitelist,
            isJackpotBattle
        );

        vm.expectRevert(abi.encodePacked("Last Jackpot Battle not finished yet"));
        startBattle(
            operator,
            maxEntries,
            treasuryFeeInBps,
            weeklyJackpotBattleInBps,
            nftCollectionWhitelist,
            isJackpotBattle
        );
    }

    function testPriceLengthShouldBeMoreThanZero() public {
        this.setUp();

        uint maxEntries = 0;
        uint treasuryFeeInBps = 500; // 5%
        uint weeklyJackpotBattleInBps = 500;
        address[] memory nftCollectionWhitelist;
        bool isJackpotBattle = true;

        vm.startPrank(operator);

        ChainWarzLottery.PriceStructure[] memory prices;

        vm.expectRevert(abi.encodePacked("No prices"));
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

    function testEntriesShouldBeMoreThanZero() public {
        this.setUp();

        uint maxEntries = 0;
        uint treasuryFeeInBps = 500; // 5%
        uint weeklyJackpotBattleInBps = 500;
        address[] memory nftCollectionWhitelist;
        bool isJackpotBattle = true;

        ChainWarzLottery.PriceStructure[5] memory fixedArray = [
            ChainWarzLottery.PriceStructure({id: 1, numEntries: 0, price: ticketPrices[0]}),
            ChainWarzLottery.PriceStructure({id: 2, numEntries: 5, price: 0.08 ether}),
            ChainWarzLottery.PriceStructure({id: 3, numEntries: 15, price: 0.1 ether}),
            ChainWarzLottery.PriceStructure({id: 4, numEntries: 50, price: 0.5 ether}),
            ChainWarzLottery.PriceStructure({id: 5, numEntries: 100, price: 0.8 ether})
        ];
        ChainWarzLottery.PriceStructure[] memory prices = new ChainWarzLottery.PriceStructure[](fixedArray.length);
        for (uint i = 0; i < fixedArray.length; i++) {
            prices[i] = fixedArray[i];
        }
        vm.expectRevert(abi.encodePacked("numEntries is 0"));

        vm.startPrank(operator);
        chainWarzLottery.startBattle(
            maxEntries,
            prices,
            treasuryFeeInBps,
            weeklyJackpotBattleInBps,
            nftCollectionWhitelist,
            isJackpotBattle
        );
        vm.stopPrank();

        // second test
        fixedArray = [
            ChainWarzLottery.PriceStructure({id: 1, numEntries: 1, price: ticketPrices[0]}),
            ChainWarzLottery.PriceStructure({id: 2, numEntries: 5, price: 0.08 ether}),
            ChainWarzLottery.PriceStructure({id: 3, numEntries: 0, price: 0.1 ether}),
            ChainWarzLottery.PriceStructure({id: 4, numEntries: 50, price: 0.5 ether}),
            ChainWarzLottery.PriceStructure({id: 5, numEntries: 100, price: 0.8 ether})
        ];

        prices = new ChainWarzLottery.PriceStructure[](fixedArray.length);
        for (uint i = 0; i < fixedArray.length; i++) {
            prices[i] = fixedArray[i];
        }
        vm.expectRevert(abi.encodePacked("numEntries is 0"));

        vm.startPrank(operator);
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
}
