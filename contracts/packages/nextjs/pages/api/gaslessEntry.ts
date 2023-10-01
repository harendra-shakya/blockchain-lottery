import { NextApiRequest, NextApiResponse } from "next";
import logger from "~~/services/logger/logger";
import { ethers } from "ethers";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { deployedContractData, battleId, amountOfEntries, address, price } = req.body;

    try {
      const apiKey = "http://127.0.0.1:8545";
      const provider = new ethers.providers.JsonRpcProvider(apiKey);
      const operatorPrivateKey = "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
      const wallet = new ethers.Wallet(operatorPrivateKey, provider);

      const beforeBalance = await wallet.getBalance();

      logger.info(`beforeBalance ${beforeBalance}`);

      const contractAddress = deployedContractData?.address;
      const abi = deployedContractData?.abi;

      const contract = await new ethers.Contract(contractAddress!, abi!, provider);

      const contractWithWallet = await contract.connect(wallet);

      const tx = await contractWithWallet.createEntries(
        battleId,
        amountOfEntries,
        address!,
        ethers.utils.parseEther(price),
      );
      console.log("waiting for tx...");

      const txReceipt = await tx.wait();

      let afterBalance;

      if (txReceipt.status === 1) {
        logger.info("Tx Minted!");
        afterBalance = await wallet.getBalance();
        logger.info(`afterBalance ${afterBalance}`);

        logger.info(`Gas Cost: ${+beforeBalance - +afterBalance}`);
      } else {
        logger.error("Tx Failed!");
      }
      res.status(200).json({ error: null });
    } catch (e) {
      logger.error(e);
      return res.status(400).json({
        error: `Oops, something went wrong. Try again.`,
      });
    }
  }
};
