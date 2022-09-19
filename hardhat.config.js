// const { ChainId } = require("@usedapp/core");

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
// require("./tasks/block-number");

/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC = process.env.GOERLI_RPC;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERLI_RPC,
      accounts: [PRIVATE_KEY],
      ChainId: 5,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      ChainId: 31337,
    },
  },
  solidity: "0.8.17",
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "UIV1Z4MU7UHQWM8DSKK9PWXF93SCJC73RH",
  },
};

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("block-number", "Prints the current block number", async () => {
  const block_number = await ethers.provider.getBlockNumber();
  console.log(block_number);
});
