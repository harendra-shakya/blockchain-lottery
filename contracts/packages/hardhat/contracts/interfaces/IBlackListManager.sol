// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IBlackListManager {
    function addToBlackList(address _player) external;

    function removeFromBlackList(address _player) external;

    function isBlackListed(address _player) external view returns (bool);

    function getBlackListedDate(address _player) external view returns (uint256);
}
