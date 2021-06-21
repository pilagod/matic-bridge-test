import { BigNumber, ethers } from "ethers";

import {
  abi as EthTestTokenABI,
  address as EthTestTokenAddress,
} from "@deployments/localhost/TestToken.json";
import {
  abi as MaticTestTokenABI,
  address as MaticTestTokenAddress,
} from "@deployments/matic/TestToken.json";
import { TestToken } from "@typechain";

import config from "../hardhatConfig";

// providers

export const ethProvider = new ethers.providers.JsonRpcProvider(
  config.networks.localhost.url
);

export const maticProvider = new ethers.providers.JsonRpcProvider(
  config.networks.matic.url
);

// signers

export const ethSigner = new ethers.Wallet(
  config.networks.localhost.accounts[0],
  ethProvider
);

export const maticSigner = new ethers.Wallet(
  config.networks.matic.accounts[0],
  maticProvider
);

// contracts

export const ethTestToken = new ethers.Contract(
  EthTestTokenAddress,
  EthTestTokenABI,
  ethProvider
) as TestToken;

export const maticTestToken = new ethers.Contract(
  MaticTestTokenAddress,
  MaticTestTokenABI,
  maticProvider
) as TestToken;

// utils

export async function getEthBalance(address: string): Promise<BigNumber> {
  return ethTestToken.connect(ethSigner).balanceOf(address);
}

export async function getMaticBalance(address: string): Promise<BigNumber> {
  return maticTestToken.connect(maticSigner).balanceOf(address);
}
