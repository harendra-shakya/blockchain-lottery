import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import { getParsedEthersError } from "~~/components/scaffold-eth";
import logger from "~~/services/logger/logger";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const {
        network = null,
        deployedContractData = null,
        nativeCurrencyPrice = null,
        // args
        battleId = null,
    } = req.body;

    if (!(network && deployedContractData && nativeCurrencyPrice)) {
        logger.error("args undefined");
        return res.status(400).json({
            error: "args undefined",
        });
    }

    try {
        let apiKey;
        let operatorPrivateKey;

        if (network == "hardhat") {
            apiKey = "http://127.0.0.1:8545";
            operatorPrivateKey = process.env.TESTING_OPERATOR_PRIVATE_KEY;
        } else if (network == "goerli") {
            apiKey = process.env.GOERLI_RPC_URL;
            operatorPrivateKey = process.env.OPERATOR_PRIVATE_KEY;
        } else if (network == "mumbai") {
            apiKey = process.env.MUMBAI_RPC_URL;
            operatorPrivateKey = process.env.OPERATOR_PRIVATE_KEY;
        } else if (network == "mainnet") {
            apiKey = process.env.MAINNET_RPC_URL;
            operatorPrivateKey = process.env.OPERATOR_PRIVATE_KEY;
        } else {
            return res.status(400).json({
                error: `Wrong Network OR RPC.`,
            });
        }

        const provider = new ethers.providers.JsonRpcProvider(apiKey);
        const wallet = new ethers.Wallet(operatorPrivateKey!, provider);

        const contractAddress = deployedContractData?.address;
        const abi = deployedContractData?.abi;

        const contract = await new ethers.Contract(contractAddress!, abi!, provider);

        const contractWithWallet = await contract.connect(wallet);

        logger.info(`Mining Tx.....`);

        const tx = await contractWithWallet.endBattle(battleId);

        logger.info(`Waiting for conformation... ${tx.hash}`);

        const txReceipt = await tx.wait();

        if (txReceipt.status === 1) {
            logger.info(`Tx successfully mined!`);

            logger.info(
                `Gas:
                    Gas : ${+ethers.utils.formatEther(txReceipt.cumulativeGasUsed * +txReceipt.effectiveGasPrice)} ETH.
                    Dollars: ${
                        +ethers.utils.formatEther(txReceipt.cumulativeGasUsed * +txReceipt.effectiveGasPrice) *
                        nativeCurrencyPrice
                    } Dollars`,
            );
            res.status(200).json({ error: null });
        } else {
            return res.status(400).json({
                error: `Tx Failed. Try again.`,
            });
        }
    } catch (e) {
        logger.error(getParsedEthersError(e));
        return res.status(400).json({
            error: e,
        });
    }
}
