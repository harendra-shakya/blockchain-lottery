import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig, developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } from "../helper-hardhat-config";
import { verify } from "../utils/verify";
import { ethers } from "hardhat";

const deployChainWarzLottery: DeployFunction = async function ({
    getNamedAccounts,
    deployments,
    getChainId,
}: HardhatRuntimeEnvironment) {
    const { deploy, get, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = await getChainId();
    const OPERATOR_ADDRESS = process.env.OPERATOR_ADDRESS;
    const INJECTOR_ADDRESS = process.env.INJECTOR_ADDRESS;
    const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS;
    const RESERVE_FUND_ADDRESS = process.env.RESERVE_FUND_ADDRESS;
    let operatorAddress;
    let injectorAddress;
    let treasuryWallet;
    let linkToken;
    let VRFCoordinatorMock;
    let linkTokenAddress;
    let vrfCoordinatorAddress;
    let additionalMessage = "";

    log("Deployer: ", deployer);

    log("ChainId: ", chainId);

    const waitConfirmations: number = developmentChains.includes(network.name) ? 1 : VERIFICATION_BLOCK_CONFIRMATIONS;

    if (chainId == undefined) {
        log("Chain id is undefined. Returning");
        return;
    }

    if (+chainId == 31337) {
        linkToken = await get("LinkToken");
        VRFCoordinatorMock = await get("VRFCoordinatorMock");
        linkTokenAddress = linkToken.address;
        vrfCoordinatorAddress = VRFCoordinatorMock.address;
        additionalMessage = " --linkaddress " + linkTokenAddress;
        operatorAddress = deployer;
        injectorAddress = deployer;
        treasuryWallet = deployer;
    } else {
        if (OPERATOR_ADDRESS == undefined || INJECTOR_ADDRESS == undefined || TREASURY_ADDRESS == undefined) {
            log("Addresses in Evn are not setup");
            return;
        }
        linkTokenAddress = networkConfig[chainId]["linkToken"];
        vrfCoordinatorAddress = networkConfig[chainId]["vrfCoordinator"];
        operatorAddress = OPERATOR_ADDRESS;
        injectorAddress = INJECTOR_ADDRESS;
        treasuryWallet = TREASURY_ADDRESS;
    }
    const keyHash = networkConfig[chainId]["keyHash"];
    const isMainnet = networkConfig[chainId]["mainnetFee"];

    const BlackListManager = await get("BlackListManager");

    const args = [
        BlackListManager.address,
        vrfCoordinatorAddress,
        linkTokenAddress,
        treasuryWallet,
        operatorAddress,
        injectorAddress,
        RESERVE_FUND_ADDRESS,
        keyHash,
        isMainnet,
    ];

    log("----------------------------------------------------");
    log("Deployer: ", deployer);
    log("args:", {
        BlackListManager: args[0],
        vrfCoordinatorAddress: args[1],
        linkTokenAddress: args[2],
        treasuryWallet: args[3],
        operatorAddress: args[4],
        injectorAddress: args[5],
        RESERVE_FUND_ADDRESS: args[6],
        keyHash: args[7],
        isMainnet: args[8],
    });
    log("args", args);

    const lottery = await deploy("ChainWarzLottery", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitConfirmations,
    });

    const fundManager = await deploy("FundManager", {
        from: deployer,
        args: [lottery.address],
        log: true,
        waitConfirmations: waitConfirmations,
    });

    const chainwarz = await ethers.getContractAt("ChainWarzLottery", lottery.address);

    await chainwarz.setFundManagerAddress(fundManager.address);

    const deploymentGasCost = lottery.receipt!.gasUsed;

    log("----------------------------------------------------");
    log("Gas for deploying ChainWarzLottery:", deploymentGasCost!.toString());
    log("13 (Gwei) -> ETH * Gas :", +deploymentGasCost! * 0.00002418442, "Dollars");
    log("----------------------------------------------------");

    log("Run the following command to fund contract with LINK:");
    log(
        "npx hardhat fund-link --contract " +
            lottery.address +
            " --network " +
            networkConfig[chainId]["name"] +
            additionalMessage,
    );

    log("----------------------------------------------------");
    log("Then run RandomNumberConsumer contract with the following command");
    log(
        "npx hardhat request-random-number --contract " +
            lottery.address +
            " --network " +
            networkConfig[chainId]["name"],
    );
    log("----------------------------------------------------");

    // if (!developmentChains.includes(network.name)) {
    //     await verify(lottery.address, args);
    // }
};

export default deployChainWarzLottery;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployChainWarzLottery.tags = ["all", "lottery"];
