/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

module.exports = {
  defaultNetwork: "swisstronik",
  solidity: { 
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: './contracts',
    artifacts: './artifacts',
    tests: "./test",
    cache: "./cache"
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    swisstronik: {
      chainId: 1291,
      url: process.env.SWISSTRONIK_RPC,
      accounts: [process.env.DEPLOY_KEY]
    },
  },
  mocha: {
    timeout: 100000000
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
  },
};