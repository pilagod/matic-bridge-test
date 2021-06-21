import { ethSigner, ethTestToken, getEthBalance } from "@utils";

async function main() {
  console.log(`[Eth] Mint 100 for ${ethSigner.address}`);
  console.log(
    `[Eth] Balance before mint: ${await getEthBalance(ethSigner.address)}`
  );
  await ethTestToken.connect(ethSigner).mint(ethSigner.address, 100);
  console.log(
    `[Eth] Balance after mint: ${await getEthBalance(ethSigner.address)}`
  );
}

main().then(() => {
  process.exit();
});
