// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import {BaseSetup} from "./BaseSetup.t.sol";
import "../../contracts/Lottery/ChainWarzLottery.sol";

contract CancelEntryTest is BaseSetup {
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

    function testCancelEntry() public {
        this.setUp();
        address payable[] memory users = createUsers(100);
        uint battleId;
        multipleEntries(battleId, users);

        vm.startPrank(owner);
        linkToken.transfer(address(chainWarzLottery), 1 ether);
        vm.stopPrank();

        vm.startPrank(operator);
        uint8[] memory fixedArray = new uint8[](1);
        fixedArray[0] = 10;

        uint256[] memory entriesToCancel = new uint256[](fixedArray.length);

        for (uint256 i = 0; i < fixedArray.length; i++) {
            entriesToCancel[i] = uint256(fixedArray[i]);
        }

        chainWarzLottery.cancelEntry(battleId, entriesToCancel, users[10]);
        ChainWarzLottery.Entries[] memory entries = chainWarzLottery.getEntries(battleId);

        assertEq(entries[10].player, address(0));
        vm.stopPrank();
    }
}
