require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    // localhost: {
    //   url: 'http://localhost:8545',
    // },
    emerald_mainnet: {
      chainId: 42262,
      url: 'https://emerald.oasis.dev',
      accounts:
        process.env.PRIVATE_KEY_OASIS !== undefined
          ? [process.env.PRIVATE_KEY_OASIS]
          : [],
    },
    emerald_testnet: {
      url: 'https://testnet.emerald.oasis.dev',
      chainId: 42261,
      accounts:
        process.env.PRIVATE_KEY_OASIS !== undefined
          ? [process.env.PRIVATE_KEY_OASIS]
          : [],
    },
  },
  paths: {
    artifacts: './src/artifacts',
  },
  mocha: {
    timeout: 60000,
  },
  solidity: "0.8.4",
};
