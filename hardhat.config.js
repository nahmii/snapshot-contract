'use strict';

require("@nomiclabs/hardhat-waffle");
require('@nahmii/hardhat-nvm');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

let accounts
if (process.env.MNEMONIC) {
  accounts = { mnemonic: process.env.MNEMONIC }
}
else if (process.env.PRIVATE_KEY) {
  accounts = [process.env.PRIVATE_KEY]
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.7.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    nahmii: {
      url: process.env.L2_URL || 'https://l2.testnet.nahmii.io',
      accounts,
      gasPrice: 15000000,
      nvm: true
    }
  }
};
