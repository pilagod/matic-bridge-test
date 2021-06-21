import {
  ethSigner,
  maticSigner,
  maticTestToken,
  getMaticBalance,
} from "@utils";

async function main() {
  console.log(`[Matic] Transfer 100 to Eth: ${ethSigner.address}`);
  console.log(
    `[Matic] Balance before transfer: ${await getMaticBalance(
      maticSigner.address
    )}`
  );
  await maticTestToken
    .connect(maticSigner)
    .crossTransfer(ethSigner.address, 100);
  await new Promise((resolve) => {
    setTimeout(async () => {
      console.log(
        `[Matic] Balance after transfer: ${await getMaticBalance(
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
