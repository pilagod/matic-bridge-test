import { ethSigner, getEthBalance } from "@utils";

async function main() {
  console.log(`[Eth] Balance: ${await getEthBalance(ethSigner.address)}`);
}

main().then(() => {
  process.exit();
});
