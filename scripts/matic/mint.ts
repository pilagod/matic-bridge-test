import { maticSigner, maticTestToken, getMaticBalance } from "@utils";

async function main() {
  console.log(`[Matic] Mint 100 for ${maticSigner.address}`);
  console.log(
    `[Matic] Balance before mint: ${await getMaticBalance(maticSigner.address)}`
  );
  await maticTestToken.connect(maticSigner).mint(maticSigner.address, 100);
  await new Promise((resolve) => {
    setTimeout(async () => {
      console.log(
        `[Matic] Balance after mint: ${await getMaticBalance(
          maticSigner.address
        )}`
      );
      resolve(true);
    }, 5000);
  });
}

main().then(() => {
  process.exit();
});
