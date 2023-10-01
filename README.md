Discover exactly what happened by following this link: [Partership Scam](https://www.linkedin.com/posts/harendra-shakya_staysafe-scam-crypto-activity-7114235992462520320-_BGX?utm_source=share&utm_medium=member_desktop)

This repository houses a comprehensive lottery full-stack application. It encompasses the following components:

- A responsive user interface
- An allowlist feature with Twitter and Discord authentication, backed by Firebase database
- A leaderboard system for managing the allowlist
- A Lottery Contract
- A Fund Manager contract that facilitates gasless transactions
- Efforts have been made to streamline certain processes and reduce centralization and cost. Refer to [EIP 4337](https://eips.ethereum.org/EIPS/eip-4337) for more details.
- A profile section for reviewing your transaction history
- Contract testing using Foundry.
- The primary contracts are BlackListManager.sol, ChainWarzLottery.sol, and FundManager.sol, with others serving as testing contracts.
- Admin panel - for initiating and concluding battles, as well as approving allowlisted users.

### If you want to make more this efficient -
- For optimal efficiency, consider eliminating unnecessary getter functions and implementing GraphQL for data retrieval.
- Also remove some useless code or interface components.
