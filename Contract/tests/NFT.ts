import { expect } from "chai";
import { ethers } from "hardhat";
import chai from "chai";
import { beforeEach } from "mocha";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";


describe("NFT is deployed", () => {
  let nftContract: Contract;
  let owner: SignerWithAddress;
  let address1: SignerWithAddress;

  beforeEach(async () => {
    const nftFactory = await ethers.getContractFactory(
      "NFT"
    );
    [owner, address1] = await ethers.getSigners();
    nftContract = await nftFactory.deploy();
  });

  it("Should initialize the NFT contract", async () => {
    expect(await nftContract).to.equal(1);
  });

  it("Should set the right owner", async () => {
    expect(await nftContract.owner()).to.equal(await owner.address);
  });
     
  });
