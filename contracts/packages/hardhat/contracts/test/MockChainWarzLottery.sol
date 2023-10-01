// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../Lottery/ChainWarzLottery.sol";

contract MockChainWarzLottery is ChainWarzLottery {
    constructor(
        address _blacklistManager,
        address _vrfCoordinator,
        address _linkToken,
        address _treasuryAddress,
        address _operatorAddress,
        address _injectorAddress,
        address _reserveFundAddress,
        bytes32 _keyHash,
        bool _mainnetFee
    )
        ChainWarzLottery(
            _blacklistManager,
            _vrfCoordinator,
            _linkToken,
            _treasuryAddress,
            _operatorAddress,
            _injectorAddress,
            _reserveFundAddress,
            _keyHash,
            _mainnetFee
        )
    {}

    function getRandomNum(uint256 _id, uint256 _entriesSize) external returns (bytes32 requestId) {
        requestId = super.getRandomNumber(_id, _entriesSize);
    }

    function fulfillRandom(bytes32 requestId, uint256 randomness) external {
        super.fulfillRandomness(requestId, randomness);
    }
}
