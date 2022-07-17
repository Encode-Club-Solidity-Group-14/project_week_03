import { BigNumber, Contract, ethers } from "ethers";
import { initWallet } from './utils/initWallet';
import * as nftJson from "../artifacts/contracts/ERC721.sol/NFT.json";
import { NFT } from "../typechain-types";

async function main() {    
  const signer = await initWallet(process.env.PRIVATE_KEY_3);
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
    throw new Error("TokenId to burn NFT missing");
  }
  const tokenId = process.argv[3];
  console.log(
    `TokenId: ${tokenId}`
  );
  console.log(`Burning...` )
  const txtMint = await nftContract.burn(BigNumber.from(tokenId));
  await txtMint.wait();
  console.log(`This is done: ${txtMint}` )
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
