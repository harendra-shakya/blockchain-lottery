// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import {BaseSetup} from "./BaseSetup.t.sol";
import "../../contracts/Lottery/ChainWarzLottery.sol";

contract GiveBatchEntriesForFreeTest is BaseSetup {
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

    function testGiveBatchEntriesForFree() public {
        this.setUp();
        address payable[] memory users = createUsers(20);

        address payable[7] memory fixedArray = [
            payable(randomUser),
            payable(owner),
            users[2],
            users[0],
            users[10],
            users[1],
            users[11]
        ];
        uint8[7] memory fixedArray2 = [5, 1, 10, 1, 7, 5, 12];

        address[] memory freePlayers = new address[](fixedArray.length);
        for (uint i = 0; i < fixedArray.length; i++) {
            freePlayers[i] = fixedArray[i];
        }

        uint256[] memory numEntries = new uint256[](fixedArray2.length);
        for (uint i = 0; i < fixedArray2.length; i++) {
            numEntries[i] = fixedArray2[i];
        }

        uint battleId = 0;

        vm.startPrank(operator);
        chainWarzLottery.giveBatchEntriesForFree(battleId, numEntries, freePlayers);
        vm.stopPrank();

        ChainWarzLottery.ClaimData memory data = chainWarzLottery.getClaimData(battleId, randomUser);
        ChainWarzLottery.ClaimData memory data2 = chainWarzLottery.getClaimData(battleId, payable(owner));
        ChainWarzLottery.ClaimData memory data3 = chainWarzLottery.getClaimData(battleId, users[2]);

        assertEq(data.numEntriesPerUser, numEntries[0]);
        assertEq(data2.numEntriesPerUser, numEntries[1]);
        assertEq(data3.numEntriesPerUser, numEntries[2]);

        multipleEntries(battleId, users);

        endBattle(battleId);
    }

    function testGiveBatchEntriesForFree100() public {
        // uint256 forkId = vm.createFork("http://127.0.0.1:8545/");
        // vm.selectFork(forkId);

        this.setUp();

        // gas

        /**
          giveBatchEntriesForFree

            1      Entry  -> 116095
            10     Entries  -> 733605
            100    Entries  -> 6910113
            1000   Entries  -> 68816145
            10000  Entries  -> 701972368
            100000 Entries  -> 8443124438
         */
        address payable[] memory users = createUsers(10000);

        address[] memory players = new address[](users.length);
        for (uint i = 0; i < users.length; i++) {
            players[i] = users[i];
        }

        uint256[] memory numEntries = new uint256[](users.length);
        for (uint i = 0; i < users.length; i++) {
            numEntries[i] = 10;
        }

        uint battleId = 0;

        vm.startPrank(operator);
        chainWarzLottery.giveBatchEntriesForFree(battleId, numEntries, players);
        vm.stopPrank();

        multipleEntries(battleId, users);

        endBattle(battleId);
    }

    function testGasLess() public {
        // uint256 forkId = vm.createFork("http://127.0.0.1:8545/");
        // vm.selectFork(forkId);

        this.setUp();

        // gas

        /**
          giveBatchEntriesForFree

            1      Entry  -> 116095
            10     Entries  -> 733605
            100    Entries  -> 6910113
            1000   Entries  -> 68816145
            10000  Entries  -> 701972368
            100000 Entries  -> 8443124438
         */
        address payable[] memory users = createUsers(5);

        uint battleId = 0;

        vm.startPrank(users[0]);
        fundManager.deposit{value: 0.08 ether}();
        vm.stopPrank();

        vm.startPrank(operator);
        chainWarzLottery.createEntries(battleId, 10, users[0], 0.08 ether);
        vm.stopPrank();

        multipleEntries(battleId, users);

        endBattle(battleId);
    }

    function testGasLess2() public {
        // uint256 forkId = vm.createFork("http://127.0.0.1:8545/");
        // vm.selectFork(forkId);

        this.setUp();

        // gas

        /**
          giveBatchEntriesForFree

            1      Entry  -> 116095
            10     Entries  -> 733605
            100    Entries  -> 6910113
            1000   Entries  -> 68816145
            10000  Entries  -> 701972368
            100000 Entries  -> 8443124438
         */
        address payable[] memory users = createUsers(5);

        uint battleId = 0;

        vm.startPrank(operator);
        // for(uint i; i < 10000; ++i) {
        //   chainWarzLottery.createEntries(battleId, 10, users[0], 0.08 ether);

        // }
        // chainWarzLottery.giveRelayEntries(battleId);
        vm.stopPrank();

        multipleEntries(battleId, users);

        endBattle(battleId);
    }
}
