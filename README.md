Discover exactly what happened by following this link: [Partership Scam](https://www.linkedin.com/posts/harendra-shakya_staysafe-scam-crypto-activity-7114235992462520320-_BGX?utm_source=share&utm_medium=member_desktop)

[![Partership Scam Video](https://i.imgur.com/iLD0DPT.png)](https://www.linkedin.com/posts/harendra-shakya_staysafe-scam-crypto-activity-7114235992462520320-_BGX?utm_source=share&utm_medium=member_desktop)


This repository houses a comprehensive lottery full-stack application. It encompasses the following components:

### **Interface:**
- A responsive user interface
- An allowlist feature with Twitter and Discord authentication + Firebase database for storing data
- Referral system for allowlisted users
- A leaderboard system for ranking allowlisted users
- A profile section for reviewing your transaction history
- Battles section for participating in a battle
- Gasless entry. Requires to add funds in FundManager Contract for gasless entry

### **Contracts:**
- A Lottery Contract
- A Fund Manager contract that manages funds for gasless transactions
- A BackList Contract for managing blacklisted users
- To make this gasless and cost-effective, I attempted to reduce the code within a function and centralize certain elements. Alternatively, you can also consider implementing EIP [4337](https://eips.ethereum.org/EIPS/eip-4337).
- Contract testing using Foundry.
- The primary contracts are BlackListManager.sol, ChainWarzLottery.sol, and FundManager.sol, with others serving as testing contracts.

### **Admin:**
- Starting Battles
- Ending battles
- Approving allowlisted users
  
### If you want to make more this efficient -
- For optimal efficiency, consider eliminating unnecessary getter functions and implementing GraphQL for data retrieval.
- Also remove some useless code or interface components.
