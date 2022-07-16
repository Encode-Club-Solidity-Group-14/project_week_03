import { BigNumber, Contract, ethers } from "ethers";
import { initWallet } from './utils/initWallet';
import * as nftJson from "../artifacts/contracts/ERC721.sol/NFT.json";
import { NFT } from "../typechain-types";

async function main() {    
  const signer = await initWallet(process.env.PRIVATE_KEY);
  if (process.argv.length < 3) {
    throw new Error("NFT address missing");
  }
  const nftAddress = process.argv[2];
  console.log(
    `Attaching NFT contract interface to address: ${nftAddress}`
  );
  const nftContract: NFT = new Contract(
    nftAddress,
    nftJson.abi,
    signer
  ) as NFT;
  console.log(`Attached`);
  if (process.argv.length < 4) {
    throw new Error("Address to find NFT");
  }
  const address = process.argv[3];
  console.log(
    `Address: ${address}`
  );address

  console.log(`finding balance for address: ${address}` )
  const balance = await nftContract.balanceOf(address);
  console.log("Balance: " + balance);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
