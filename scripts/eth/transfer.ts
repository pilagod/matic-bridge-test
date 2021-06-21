import { ethSigner, ethTestToken, maticSigner, getEthBalance } from "@utils";

async function main() {
  console.log(`[Eth] Transfer 100 to Matic: ${maticSigner.address}`);
  console.log(
    `[Eth] Balance before transfer: ${await getEthBalance(ethSigner.address)}`
  );
  await ethTestToken.connect(ethSigner).crossTransfer(maticSigner.address, 100);
  console.log(
    `[Eth] Balance after transfer: ${await getEthBalance(ethSigner.address)}`
  );
}

main().then(() => {
  process.exit();
});
