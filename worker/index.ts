import { BigNumber } from "ethers";

import { ethSigner, ethTestToken, maticTestToken, maticSigner } from "@utils";

let init = false;

async function main() {
  ethTestToken.on("CrossDeposit", async (to: string, amount: BigNumber) => {
    if (!init) {
      return;
    }
    console.log("[Eth] CrossDeposit: ", to, amount.toString());
  });

  ethTestToken.on("CrossTransfer", async (to: string, amount: BigNumber) => {
    if (!init) {
      return;
    }
    console.log("[Eth] CrossTransfer: ", to, amount.toString());
    await maticTestToken.connect(maticSigner).crossDeposit(to, amount);
  });

  maticTestToken.on("CrossDeposit", async (to: string, amount: BigNumber) => {
    console.log("[Matic] CrossDeposit: ", to, amount.toString());
  });

  maticTestToken.on("CrossTransfer", async (to: string, amount: BigNumber) => {
    console.log("[Matic] CrossTransfer: ", to, amount.toString());
    await ethTestToken.connect(ethSigner).crossDeposit(to, amount);
  });

  console.log("Wait for worker...");
  await new Promise((resolve) => {
    setTimeout(() => {
      init = true;
      console.log("Worker is running.");
      resolve(init);
    }, 3000);
  });
}

main();
