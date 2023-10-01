import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } from "../helper-hardhat-config";
import { verify } from "../utils/verify";

const deployBlackListManager: DeployFunction = async function ({
    getNamedAccounts,
    deployments,
    getChainId,
}: HardhatRuntimeEnvironment) {
    const { deploy, get, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = await getChainId();

    console.log("Deployer: ", deployer);

    const waitConfirmations: number = developmentChains.includes(network.name) ? 1 : VERIFICATION_BLOCK_CONFIRMATIONS;

    const blackListManager = await deploy("BlackListManager", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: waitConfirmations,
    });

    const deploymentGasCost = blackListManager.receipt!.gasUsed;

    log("----------------------------------------------------");
    log("Gas for deploying BlackListManager:", deploymentGasCost!.toString());
    log("13 (Gwei) * ETH Price * Gas :", +deploymentGasCost! * 0.00002418442, "Dollars");
    log("----------------------------------------------------");
    log("Deployer: deployer");
    log("----------------------------------------------------");
    log("BlackListManager contract address is: ", blackListManager.address);
    log("----------------------------------------------------");

    // if (!developmentChains.includes(network.name)) {
    //     await verify(blackListManager.address, []);
    // }
};

export default deployBlackListManager;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployBlackListManager.tags = ["all", "blacklist"];
