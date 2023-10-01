import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployMocks: DeployFunction = async function ({
    getNamedAccounts,
    deployments,
    getChainId,
}: HardhatRuntimeEnvironment) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = await getChainId();
    // If we are on a local development network, we need to deploy mocks!
    if (+chainId == 31337) {
        log("Local network detected! Deploying mocks...");
        const linkToken = await deploy("LinkToken", { from: deployer, log: true });
        await deploy("VRFCoordinatorMock", {
            from: deployer,
            log: true,
            args: [linkToken.address],
        });
        await deploy("MockOracle", {
            from: deployer,
            log: true,
            args: [linkToken.address],
        });
        log("Mocks Deployed!");
        log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        log("You are deploying to a local network, you'll need a local network running to interact");
        log("Please run `npx hardhat console` to interact with the deployed smart contracts!");
        log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    }
};

export default deployMocks;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployMocks.tags = ["all", "mocks"];
