import { ethers } from "hardhat";
import { initWallet } from './utils/initWallet';
import * as nftJson from "../artifacts/contracts/ERC721.sol/NFT.json";

async function main() {    
  const signer = await initWallet(process.env.PRIVATE_KEY);
  const nftFactory = new ethers.ContractFactory(
    nftJson.abi, 
    nftJson.bytecode,
    signer
  );
 const nftContract = await nftFactory.deploy();
 console.log("Awaiting confirmations");
 await nftContract.deployed();
 console.log("Completed");
 console.log(`Token Contract deployed at ${nftContract.address}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
