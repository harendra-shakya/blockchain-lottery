import { assert, expect } from "chai";
import { developmentChains, networkConfig } from "../../helper-hardhat-config";
import { getNamedAccounts, ethers, network, deployments } from "hardhat";
import { ChainWarzLottery } from "../../typechain";
import { Contract, Signer } from "ethers";
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const RANDOM_ADDRESS = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
const ETH_PRICE = 1900;

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Chain Warz Lottery Unit Tests", function () {
          let lottery: Contract, fundManager: Contract, deployer;
          let user: Signer;
          const treasuryFeeInBps = 500;
          const weeklyJackpotBattleBps = 500;
          const maxEntries = 0;
          const nftCollectionWhitelist: string[] = [];
          const IsJackpotBattle = false;
          const battleId = 0;
          const prices = [
              {
                  id: 1,
                  numEntries: 10,
                  price: ethers.utils.parseEther("0.0008"),
              },
              {
                  id: 2,
                  numEntries: 20,
                  price: ethers.utils.parseEther("0.001"),
              },
              {
                  id: 3,
                  numEntries: 30,
                  price: ethers.utils.parseEther("0.005"),
              },
              {
                  id: 4,
                  numEntries: 40,
                  price: ethers.utils.parseEther("0.008"),
              },
              {
                  id: 5,
                  numEntries: 100,
                  price: ethers.utils.parseEther("0.01"),
              },
          ];
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer;
              await deployments.fixture(["all"]);
              //   const { deploy, get, log } = deployments;
              const accounts = await ethers.getSigners();
              user = accounts[0];

              let contract = await deployments.get("ChainWarzLottery");
              lottery = await ethers.getContractAt(contract.abi, contract.address);

              contract = await deployments.get("FundManager");
              fundManager = await ethers.getContractAt(contract.abi, contract.address);
              const tx = await lottery.startBattle(
                  maxEntries,
                  prices,
                  treasuryFeeInBps,
                  weeklyJackpotBattleBps,
                  nftCollectionWhitelist,
                  IsJackpotBattle,
              );

              const txReceipt = await tx.wait();
          });

          describe("gas test", function () {
              it("startBattle", async function () {
                  const tx = await lottery.startBattle(
                      maxEntries,
                      prices,
                      treasuryFeeInBps,
                      weeklyJackpotBattleBps,
                      nftCollectionWhitelist,
                      IsJackpotBattle,
                  );

                  const txReceipt = await tx.wait();

                  const gasFee = ethers.utils.formatEther((+tx.gasPrice * +txReceipt.gasUsed).toString());

                  console.log("Gas Used: ", +txReceipt.gasUsed);
                  console.log(`Start Battle Gas Fee: ${+gasFee * ETH_PRICE} Dollars`);
              });
              it("buyFighter", async function () {
                  const battleId = 0;
                  const priceId = 1;
                  const tx = await lottery.buyFighter(battleId, priceId, ZERO_ADDRESS, 0, {
                      value: ethers.utils.parseEther("0.0008"),
                  });

                  const txReceipt = await tx.wait();

                  const gasFee = ethers.utils.formatEther((+tx.gasPrice * +txReceipt.gasUsed).toString());
                  console.log("Gas Used: ", +txReceipt.gasUsed);
                  console.log(`Buy Fighter Gas Fee: ${+gasFee * ETH_PRICE} Dollars`);
              });

              it("buyFighterAndGetWeeklyFreeEntries", async function () {
                  const priceId = 1;
                  const tx = await lottery.buyFighterAndGetWeeklyFreeEntries(battleId, priceId, ZERO_ADDRESS, 0, {
                      value: ethers.utils.parseEther("0.0008"),
                  });

                  const txReceipt = await tx.wait();

                  const gasFee = ethers.utils.formatEther((+tx.gasPrice * +txReceipt.gasUsed).toString());
                  console.log("Gas Used: ", +txReceipt.gasUsed);
                  console.log(`Buy Fighter & Get Free Entries Gas Fee: ${+gasFee * ETH_PRICE} Dollars`);
              });

              it("createEntries", async function () {
                  const amountOfEntries = 10;

                  fundManager.connect(user).deposit({ value: ethers.utils.parseEther("0.8") });

                  const tx = await lottery.createEntries(
                      battleId,
                      amountOfEntries,
                      user.getAddress(),
                      ethers.utils.parseEther("0.0008"),
                  );

                  const txReceipt = await tx.wait();

                  const gasFee = ethers.utils.formatEther((+tx.gasPrice * +txReceipt.gasUsed).toString());
                  console.log("Gas Used: ", +txReceipt.gasUsed);
                  console.log(`Gasless Entry Gas Fee: ${+gasFee * ETH_PRICE} Dollars`);
              });

              it("giveBatchEntriesForFree 1", async function () {
                  const length = 1;

                  console.log(`Players Length: ${length}`);

                  let players: string[] = new Array<string>(length);
                  for (let i = 0; i < length; i++) {
                      players[i] = RANDOM_ADDRESS;
                  }

                  let numEntries: number[] = new Array<number>(length);
                  for (let i = 0; i < length; i++) {
                      numEntries[i] = 10;
                  }

                  const tx = await lottery.giveBatchEntriesForFree(battleId, numEntries, players);

                  const txReceipt = await tx.wait();

                  const gasFee = ethers.utils.formatEther((+tx.gasPrice * +txReceipt.gasUsed).toString());
                  console.log("Gas Used: ", +txReceipt.gasUsed);
                  console.log(`Batch Entries Gas Fee: ${+gasFee * ETH_PRICE} Dollars`);
              });
              it("giveBatchEntriesForFree 10", async function () {
                  const length = 10;

                  console.log(`Players Length: ${length}`);

                  let players: string[] = new Array<string>(length);
                  for (let i = 0; i < length; i++) {
                      players[i] = RANDOM_ADDRESS;
                  }

                  let numEntries: number[] = new Array<number>(length);
                  for (let i = 0; i < length; i++) {
                      numEntries[i] = 10;
                  }

                  const tx = await lottery.giveBatchEntriesForFree(battleId, numEntries, players);

                  const txReceipt = await tx.wait();

                  const gasFee = ethers.utils.formatEther((+tx.gasPrice * +txReceipt.gasUsed).toString());
                  console.log("Gas Used: ", +txReceipt.gasUsed);
                  console.log(`Batch Entries Gas Fee: ${+gasFee * ETH_PRICE} Dollars`);
              });
              it("giveBatchEntriesForFree 100", async function () {
                  const length = 100;

                  console.log(`Players Length: ${length}`);

                  let players: string[] = new Array<string>(length);
                  for (let i = 0; i < length; i++) {
                      players[i] = RANDOM_ADDRESS;
                  }

                  let numEntries: number[] = new Array<number>(length);
                  for (let i = 0; i < length; i++) {
                      numEntries[i] = 10;
                  }

                  const tx = await lottery.giveBatchEntriesForFree(battleId, numEntries, players);

                  const txReceipt = await tx.wait();

                  const gasFee = ethers.utils.formatEther((+tx.gasPrice * +txReceipt.gasUsed).toString());
                  console.log("Gas Used: ", +txReceipt.gasUsed);
                  console.log(`Batch Entries Gas Fee: ${+gasFee * ETH_PRICE} Dollars`);
              });
          });
      });
