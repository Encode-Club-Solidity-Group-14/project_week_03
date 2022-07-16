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
    throw new Error("Address to receive NFT missing");
  }
  const beneficiaryAddress = process.argv[3];
  console.log(
    `To address: ${beneficiaryAddress}`
  );
  if (process.argv.length < 5) {
    throw new Error("NFT tokenId missing");
  }
  const tokenId = process.argv[4];
  console.log(
    `TokenId: ${tokenId}`
  );
  if (process.argv.length < 6) {
    throw new Error("NFT uri missing");
  }
  const uri = process.argv[5];
  console.log(
    `NFT uri: ${uri}`
  );
  console.log(`Minting...` )
  const txtMint = await nftContract.safeMint(beneficiaryAddress, BigNumber.from(tokenId), uri);
  await txtMint.wait();
  console.log(`Minted: ${txtMint}` )
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
