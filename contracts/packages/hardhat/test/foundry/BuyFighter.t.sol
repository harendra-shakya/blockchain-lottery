// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import {BaseSetup} from "./BaseSetup.t.sol";
import "../../contracts/Lottery/ChainWarzLottery.sol";

contract BuyFighterTest is BaseSetup {
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

    function testBuyFighterM() public {
        this.setUp();
        address payable[] memory users = createUsers(2);
        uint battleId = 0;
        uint priceId = 1;
        address collection = address(0);
        uint tokenIdUsed = 0;

        vm.startPrank(users[0]);
        chainWarzLottery.buyFighter{value: ticketPrices[0]}(battleId, priceId, collection, tokenIdUsed);
        vm.stopPrank();

        multipleEntries(battleId, users);
        endBattle(battleId);
    }

    function testPriceIdShouldBeMoreThanZero() public {
        this.setUp();
        address payable[] memory users = createUsers(2);

        vm.startPrank(users[0]);
        uint battleId = 0;
        uint priceId = 0;
        address collection = address(0);
        uint tokenIdUsed = 0;
        vm.expectRevert(abi.encodePacked("_priceId is 0"));
        chainWarzLottery.buyFighter{value: ticketPrices[0]}(battleId, priceId, collection, tokenIdUsed);
        vm.stopPrank();
    }

    function testShouldIncreaseFreeWeeklyEntry() public {
        this.setUp();
        address payable[] memory users = createUsers(2);
        uint battleId = 0;
        uint priceId = 1;
        address collection = address(0);
        uint tokenIdUsed = 0;

        vm.startPrank(users[0]);
        chainWarzLottery.buyFighter{value: ticketPrices[0]}(battleId, priceId, collection, tokenIdUsed);
        vm.stopPrank();

        ChainWarzLottery.FreeEntries memory freeEntriesStruct = chainWarzLottery.getWeeklyFreeEntries(
            chainWarzLottery.jackpotBattleId(),
            users[0]
        );

        ChainWarzLottery.ClaimData memory data = chainWarzLottery.getClaimData(battleId, users[0]);

        assertEq(freeEntriesStruct.freeEntries, 1);
        assertEq(data.numEntriesPerUser, 1);
    }

    function testShouldNotIncreaseFreeWeeklyEntryTwoTimes() public {
        this.setUp();
        address payable[] memory users = createUsers(2);

        vm.startPrank(users[0]);
        uint battleId = 0;
        uint priceId = 1;
        address collection = address(0);
        uint tokenIdUsed = 0;
        chainWarzLottery.buyFighter{value: ticketPrices[0]}(battleId, priceId, collection, tokenIdUsed);
        chainWarzLottery.buyFighter{value: ticketPrices[0]}(battleId, priceId, collection, tokenIdUsed);
        chainWarzLottery.buyFighter{value: ticketPrices[0]}(battleId, priceId, collection, tokenIdUsed);
        chainWarzLottery.buyFighter{value: ticketPrices[0]}(battleId, priceId, collection, tokenIdUsed);
        chainWarzLottery.buyFighter{value: ticketPrices[0]}(battleId, priceId, collection, tokenIdUsed);
        vm.stopPrank();

        ChainWarzLottery.FreeEntries memory freeEntriesStruct = chainWarzLottery.getWeeklyFreeEntries(
            chainWarzLottery.jackpotBattleId(),
            users[0]
        );

        ChainWarzLottery.ClaimData memory data = chainWarzLottery.getClaimData(battleId, users[0]);

        assertEq(freeEntriesStruct.freeEntries, 1);
        assertEq(data.numEntriesPerUser, 5);
    }

    function testBlackListedUserCantJoin() public {
        this.setUp();
        address payable[] memory users = createUsers(2);
        uint battleId = 0;
        uint priceId = 1;
        address collection = address(0);
        uint tokenIdUsed = 0;

        vm.startPrank(owner);
        blacklistManager.addToBlackList(users[0]);
        vm.stopPrank();

        vm.startPrank(users[0]);
        vm.expectRevert(abi.encodePacked("Blacklisted!"));
        chainWarzLottery.buyFighter{value: ticketPrices[0]}(battleId, priceId, collection, tokenIdUsed);
        vm.stopPrank();
    }

    function testRevertIfMsgValueNotEqualToPrice() public {
        this.setUp();
        address payable[] memory users = createUsers(2);
        uint battleId = 0;
        uint priceId = 1;
        address collection = address(0);
        uint tokenIdUsed = 0;

        vm.startPrank(users[0]);
        vm.expectRevert(abi.encodePacked("msg.value must be equal to the price"));
        chainWarzLottery.buyFighter{value: 0.08 ether}(battleId, priceId, collection, tokenIdUsed);
        vm.stopPrank();
    }

    function testUpdateValuesCorrectly() public {
        this.setUp();
        address payable[] memory users = createUsers(2);
        uint battleId = 0;
        uint priceId = 1;
        address collection = address(0);
        uint tokenIdUsed = 0;
        uint _value = ticketPrices[0];

        vm.startPrank(users[0]);
        // 2 times entry
        chainWarzLottery.buyFighter{value: _value}(battleId, priceId, collection, tokenIdUsed);
        chainWarzLottery.buyFighter{value: _value}(battleId, priceId, collection, tokenIdUsed);
        vm.stopPrank();

        ChainWarzLottery.FreeEntries memory freeEntriesStruct = chainWarzLottery.getWeeklyFreeEntries(
            chainWarzLottery.jackpotBattleId(),
            users[0]
        );

        ChainWarzLottery.ClaimData memory data = chainWarzLottery.getClaimData(battleId, users[0]);

        ChainWarzLottery.BattleStruct memory battle = chainWarzLottery.getBattle(0);

        assertEq(freeEntriesStruct.freeEntries, 1);
        assertEq(battle.amountCollected, _value * 2);
        assertEq(battle.entriesLength, 2);
        assertEq(data.numEntriesPerUser, 2);
        assertEq(data.amountSpentInWeis, _value * 2);
    }

    function testRequiresNft() public {
        BaseSetup.setUp();
        uint maxEntries = 0;
        uint treasuryFeeInBps = 500; // 5%
        uint weeklyJackpotBattleInBps = 500;

        address[1] memory fixedArray = [address(nft)];
        address[] memory nftCollectionWhitelist = new address[](fixedArray.length);
        for (uint i = 0; i < fixedArray.length; i++) {
            nftCollectionWhitelist[i] = fixedArray[i];
        }

        bool isJackpotBattle = false;

        startBattle(
            operator,
            maxEntries,
            treasuryFeeInBps,
            weeklyJackpotBattleInBps,
            nftCollectionWhitelist,
            isJackpotBattle
        );

        address payable[] memory users = createUsers(2);
        uint battleId = 0;
        uint priceId = 1;
        address collection = address(nft);
        uint tokenIdUsed = 0;

        vm.startPrank(users[0]);
        nft.mint(1);
        chainWarzLottery.buyFighter{value: ticketPrices[0]}(battleId, priceId, collection, tokenIdUsed);
        vm.stopPrank();
    }

    function testCannotJoinBattleIfRequiresNft() public {
        BaseSetup.setUp();
        uint maxEntries = 0;
        uint treasuryFeeInBps = 500; // 5%
        uint weeklyJackpotBattleInBps = 500;

        address[1] memory fixedArray = [address(nft)];
        address[] memory nftCollectionWhitelist = new address[](fixedArray.length);
        for (uint i = 0; i < fixedArray.length; i++) {
            nftCollectionWhitelist[i] = fixedArray[i];
        }

        bool isJackpotBattle = false;

        startBattle(
            operator,
            maxEntries,
            treasuryFeeInBps,
            weeklyJackpotBattleInBps,
            nftCollectionWhitelist,
            isJackpotBattle
        );

        address payable[] memory users = createUsers(2);

        vm.startPrank(users[0]);
        nft.mint(1);
        vm.stopPrank();

        uint battleId = 0;
        uint priceId = 1;
        address collection = address(nft);
        uint tokenIdUsed = 0;

        vm.startPrank(users[1]);
        vm.expectRevert(abi.encodePacked("Not the owner of tokenId"));
        chainWarzLottery.buyFighter{value: ticketPrices[0]}(battleId, priceId, collection, tokenIdUsed);
        vm.stopPrank();
    }

    function testCannotJoinWithDifferentWalletsIfRequiresNft() public {
        BaseSetup.setUp();
        uint maxEntries = 0;
        uint treasuryFeeInBps = 500; // 5%
        uint weeklyJackpotBattleInBps = 500;

        address[1] memory fixedArray = [address(nft)];
        address[] memory nftCollectionWhitelist = new address[](fixedArray.length);
        for (uint i = 0; i < fixedArray.length; i++) {
            nftCollectionWhitelist[i] = fixedArray[i];
        }

        bool isJackpotBattle = false;

        startBattle(
            operator,
            maxEntries,
            treasuryFeeInBps,
            weeklyJackpotBattleInBps,
            nftCollectionWhitelist,
            isJackpotBattle
        );

        address payable[] memory users = createUsers(2);
        uint battleId = 0;
        uint priceId = 1;
        address collection = address(nft);
        uint tokenIdUsed = 0;

        vm.startPrank(users[0]);
        nft.mint(1);
        chainWarzLottery.buyFighter{value: ticketPrices[0]}(battleId, priceId, collection, tokenIdUsed);
        chainWarzLottery.buyFighter{value: ticketPrices[0]}(battleId, priceId, collection, tokenIdUsed);
        nft.safeTransferFrom(users[0], users[1], tokenIdUsed);
        vm.stopPrank();

        vm.startPrank(users[1]);
        vm.expectRevert(abi.encodePacked("tokenId used"));
        chainWarzLottery.buyFighter{value: ticketPrices[0]}(battleId, priceId, collection, tokenIdUsed);
        vm.stopPrank();
    }

    function testRevertIfBuysMoreThanMaxEntries() public {
        BaseSetup.setUp();
        uint maxEntries = 2;
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
        address payable[] memory users = createUsers(2);
        uint battleId = 0;
        uint priceId = 1;
        address collection = address(0);
        uint tokenIdUsed = 0;

        vm.startPrank(users[0]);
        chainWarzLottery.buyFighter{value: ticketPrices[0]}(battleId, priceId, collection, tokenIdUsed);
        chainWarzLottery.buyFighter{value: ticketPrices[0]}(battleId, priceId, collection, tokenIdUsed);
        vm.expectRevert(abi.encodePacked("Bought too many entries"));
        chainWarzLottery.buyFighter{value: ticketPrices[0]}(battleId, priceId, collection, tokenIdUsed);

        vm.stopPrank();
    }
}
