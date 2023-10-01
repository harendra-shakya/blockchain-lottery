task("mine-blocks", "Mine block", async (taskArgs, hre) => {
    console.log("Moving blocks...");
    for (let i = 0; i < 1; i++) {
        await network.provider.request({
            method: "evm_mine",
            params: [],
        });
        // if (sleepAmount) {
        //     console.log(`Sleeping for ${sleepAmount}`);
        //     await sleep(sleepAmount);
        // }
    }
    // console.log(`Moved ${amount} blocks`);
});

module.exports = {};
