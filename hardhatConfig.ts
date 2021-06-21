import fs from "fs";

const config = {
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      ],
    },
    hardhat: {},
    matic: {
      chainId: 80001,
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [fs.readFileSync(".secret").toString().trim()],
    },
  },
  solidity: {
    version: "0.8.5",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

export default config;
