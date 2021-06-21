import { maticSigner, getMaticBalance } from "@utils";

async function main() {
  console.log(`[Matic] Balance: ${await getMaticBalance(maticSigner.address)}`);
}

main().then(() => {
  process.exit();
});
