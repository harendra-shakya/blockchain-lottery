const { ethers, network } = require("hardhat");

export enum Status {
    Pending,
    Open,
    Close,
    Cancelled,
}

const BATTLE_ID = 5;
const LOTTERY_ADDRESS = "0x9d4454B023096f34B160D6B654540c56A1F81688";
const VRF_COORDINATOR_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

async function mockKeepers() {
    const lottery = await ethers.getContractAt("ChainWarzLottery", LOTTERY_ADDRESS);

    const battle = await lottery.getBattle(BATTLE_ID);

    if (battle.status == Status.Open) {
        console.log("--------------------------------------------------------");
        console.log("open");
        console.log("--------------------------------------------------------");
        const tx = await lottery.endBattle(BATTLE_ID);
        const txReceipt = await tx.wait(1);
        const requestId = txReceipt.events[3].args.requestId;
        console.log(`Vrf RequestId: ${requestId}`);
        if (network.config.chainId == 31337) {
            await mockVrf(requestId, lottery);
        }
    } else {
        console.log("--------------------------------------------------------");
        console.log("Battle not open");
        console.log("--------------------------------------------------------");
    }
}

async function mockVrf(requestId: string, lottery: any) {
    console.log("We on a local network? Ok let's pretend...");
    const vrfCoordinatorMock = await ethers.getContractAt("VRFCoordinatorMock", VRF_COORDINATOR_ADDRESS);
    await vrfCoordinatorMock.fulfillRandomness(requestId, lottery.address);
    console.log("Responded!");
    // const recentWinner = await lottery.getRecentWinner();
    // console.log(`The winner is: ${recentWinner}`);
}

mockKeepers()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
