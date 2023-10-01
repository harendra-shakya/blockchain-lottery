// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import {BaseSetup} from "./BaseSetup.t.sol";
import "../../contracts/Lottery/ChainWarzLottery.sol";

contract CancelBattleTest is BaseSetup {
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

    function testCancelBattle() public {
        this.setUp();
        uint battleId;

        vm.startPrank(operator);

        chainWarzLottery.cancelBattle(battleId);
        ChainWarzLottery.BattleStruct memory battle = chainWarzLottery.getBattle(battleId);
        assertEq(battle.cancellingDate, block.timestamp);

        vm.stopPrank();
    }
}
