type NetworkConfigItem = {
    name: string;
    vrfCoordinator: string;
    treasuryWallet: string;
    linkToken: string;
    keyHash: string;
    operatorAddress: string;
    blacklistManager: string;
    mainnetFee: boolean;
};

type NetworkConfigMap = {
    [chainId: string]: NetworkConfigItem;
};

// https://docs.chain.link/vrf/v1/supported-networks

export const networkConfig: NetworkConfigMap = {
    default: {
        name: "hardhat",
        vrfCoordinator: "",
        treasuryWallet: "",
        linkToken: "",
        keyHash: "0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4",
        operatorAddress: "",
        blacklistManager: "",
        mainnetFee: false,
    },
    31337: {
        name: "localhost",
        vrfCoordinator: "",
        treasuryWallet: "",
        linkToken: "",
        keyHash: "0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4",
        operatorAddress: "",
        blacklistManager: "",
        mainnetFee: false,
    },
    5: {
        name: "goerli",
        vrfCoordinator: "0x2bce784e69d2Ff36c71edcB9F88358dB0DfB55b4",
        treasuryWallet: "",
        linkToken: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
        keyHash: "0x0476f9a745b61ea5c0ab224d3a6e4c99f0b02fce4da01143a4f70aa80ae76e8a",
        operatorAddress: "",
        blacklistManager: "",
        mainnetFee: false,
    },
    1: {
        name: "mainnet",
        vrfCoordinator: "0xf0d54349aDdcf704F77AE15b96510dEA15cb7952",
        treasuryWallet: "",
        linkToken: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
        keyHash: "0xAA77729D3466CA35AE8D28B3BBAC7CC36A5031EFDC430821C02BC31A238AF445",
        operatorAddress: "",
        blacklistManager: "",
        mainnetFee: true,
    },

    80001: {
        name: "mumbai",
        vrfCoordinator: "0x2bce784e69d2Ff36c71edcB9F88358dB0DfB55b4",
        treasuryWallet: "",
        linkToken: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
        keyHash: "0x0476f9a745b61ea5c0ab224d3a6e4c99f0b02fce4da01143a4f70aa80ae76e8a",
        operatorAddress: "",
        blacklistManager: "",
        mainnetFee: false,
    },
};

export const developmentChains: string[] = ["hardhat", "localhost"];
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6;
