// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";

interface IChainWarzLottery {
    function injectFunds(uint256 _battleId) external payable;
}

/**
 * @title FundManager
 * @dev A contract that manages user balances and allows deposits and withdrawals of funds.
 * It inherits from OpenZeppelin's AccessControl contract to manage role-based access control.
 */
contract FundManager is AccessControl {
    mapping(address => uint256) private balances;

    bytes32 public constant CHAINWARZ_CONTRACT = keccak256("CHAINWARZ_CONTRACT");

    IChainWarzLottery chainWarzLottery;

    event BalanceUpdated(address indexed user, uint256 newBalance);
    event BalanceDecreasedByContract(address indexed user, uint256 amount);

    /**
     * @dev Initializes the contract and sets the default admin role to the deploying address.
     * @param lotteryAddress The address of the CHAINWARZ_CONTRACT role.
     */
    constructor(address lotteryAddress) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(CHAINWARZ_CONTRACT, lotteryAddress);
        chainWarzLottery = IChainWarzLottery(lotteryAddress);
    }

    /**
     * @dev Fallback function that gets called when the contract receives ether without any data.
     * It simply delegates the call to the `deposit` function.
     */
    receive() external payable {
        deposit();
    }

    /**
     * @dev Fallback function that gets called when the contract receives ether with unrecognized data.
     * It simply delegates the call to the `deposit` function.
     */
    fallback() external payable {
        deposit();
    }

    /**
     * @dev Returns the balance of a given user.
     * @param user The address of the user.
     * @return The balance of the user.
     */
    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }

    /**
     * @dev Allows a user to deposit funds into their balance.
     * The deposited funds are added to the user's balance and emit the BalanceUpdated event.
     */
    function deposit() public payable {
        balances[msg.sender] += msg.value;
        emit BalanceUpdated(msg.sender, balances[msg.sender]);
    }

    /**
     * @dev Allows a user to withdraw a specified amount from their balance.
     * The user must have a sufficient balance, and the withdrawn amount is transferred to their address.
     * @param amount The amount to withdraw.
     */
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        emit BalanceUpdated(msg.sender, balances[msg.sender]);

        payable(msg.sender).transfer(amount);
    }

    /**
     * @dev Allows the CHAINWARZ_CONTRACT role to decrease a user's balance by a specified amount.
     * The user must have a sufficient balance, and the BalanceDecreasedByContract event is emitted.
     * @param user The address of the user whose balance will be decreased.
     * @param amount The amount to decrease the user's balance by.
     */
    function decreaseBalanceByContract(uint256 battleId, address user, uint256 amount) external onlyRole(CHAINWARZ_CONTRACT) {
        require(balances[user] >= amount, "Insufficient balance");

        balances[user] -= amount;

        chainWarzLottery.injectFunds{value: amount}(battleId);
        emit BalanceDecreasedByContract(user, amount);
    }
}
