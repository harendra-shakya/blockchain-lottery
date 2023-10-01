// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

// import "./ChainWarzLottery.sol";

contract Relayer {
    using ECDSA for bytes32;

    // ChainWarzLottery public lottery;

    // constructor(address _lotteryAddress) {
    // lottery = ChainWarzLottery(_lotteryAddress);
    // }

    function giveBatchEntriesForFree(address user, bytes32 message, bytes calldata signature) public {
        // Construct the meta-transaction message
        // bytes32 message = keccak256(abi.encodePacked(user, lotteryId));

        // Hash the message to create the message digest
        bytes32 messageDigest = ECDSA.toEthSignedMessageHash(message);

        // Recover the signer's address from the message digest and signature
        address signer = ECDSA.recover(messageDigest, signature);

        // Check that the signer is the user
        require(signer == user, "Invalid signature");

        // Relay the meta-transaction to the Lottery contract
        // lottery.relayMetaTransaction(user, lotteryId, signature);
    }
}
