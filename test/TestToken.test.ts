import { expect } from "chai";
import { Signer } from "ethers";
import { deployments, ethers } from "hardhat";

import { TestToken } from "@typechain";

describe("TestToken", () => {
  let owner: Signer;

  let testToken: TestToken;

  before(async () => {
    [owner] = await ethers.getSigners();
  });

  beforeEach(async () => {
    await deployments.fixture("TestToken");
    testToken = await ethers.getContract("TestToken");
  });

  describe("crossDeposit", async () => {
    it("should mint deposit amount and emit CrossDeposit event", async () => {
      const [_, recipient] = await ethers.getSigners();

      // should emit CrossDeposit event
      const tx = await testToken.crossDeposit(recipient.address, 100);
      await expect(tx)
        .to.emit(testToken, "CrossDeposit")
        .withArgs(recipient.address, 100);

      // should mint deposit amount
      const totalSupply = await testToken.totalSupply();
      expect(totalSupply).to.be.equal(100);
    });
  });

  describe("crossTrasfer", () => {
    it("should burn transfer amount and emit CrossTransfer event", async () => {
      await testToken.mint(await owner.getAddress(), 100);

      const [_, recipient] = await ethers.getSigners();

      // should emit CrossTransfer event
      const tx = await testToken.crossTransfer(recipient.address, 100);
      await expect(tx)
        .to.emit(testToken, "CrossTransfer")
        .withArgs(recipient.address, 100);

      // should burn transfer amount
      const totalSupply = await testToken.totalSupply();
      expect(totalSupply).to.be.equal(0);
    });
  });
});
