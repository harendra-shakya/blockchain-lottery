// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import {BaseSetup} from "./BaseSetup.t.sol";

contract BlacklistingTest is BaseSetup {
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

    function testBlacklisting() public {
        this.setUp();
        address payable[] memory users = createUsers(2);

        vm.startPrank(owner);

        blacklistManager.addToBlackList(users[0]);
        assertEq(blacklistManager.isBlackListed(users[0]), true);

        blacklistManager.removeFromBlackList(users[0]);
        assertEq(blacklistManager.isBlackListed(users[0]), false);

        vm.stopPrank();
    }
}
