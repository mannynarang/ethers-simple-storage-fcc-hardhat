// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

require("@nomiclabs/hardhat-etherscan");

async function main() {
  const SimpleStorageFactory = await hre.ethers.getContractFactory(
    "SimpleStorage"
  );

  console.log("Deploying a contract");
  const SimpleStorage = await SimpleStorageFactory.deploy();

  await SimpleStorage.deployed();
  console.log(SimpleStorage.address);

  // console.log(hre.config);
  if (hre.network["config"].chainId != 31337) {
    //wait 6 blocks
    await SimpleStorage.deployTransaction.wait(6);

    await verify(SimpleStorage.address, []);
  }

  const currentValue = await SimpleStorage.retrieve();
  console.log(`Current Value is ${currentValue}`);
  const transactionResponse = await SimpleStorage.store(7);
  await SimpleStorage.deployTransaction.wait(1);
  const updatedValue = await SimpleStorage.retrieve();
  console.log(`Current Value is ${updatedValue}`);
}

async function verify(contractaddress, args) {
  console.log("Verifying contract");

  try {
    await run("verify:verify", {
      address: contractaddress,
      constructorArguments: args,
    });
  } catch (error) {
    console.log(error);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
