import { ethers } from "hardhat";

const EXPOSED_KEY = "NOT_USED";

export async function initWallet(key : string | undefined) {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(key ?? EXPOSED_KEY);

  console.log(`Using address ${wallet.address}`);
  const provider = ethers.providers.getDefaultProvider("ropsten");
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  //Throw error if connected wallet has under 0.01 ETH
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }
  return signer;
}

export async function initWallet1() {
  return initWallet(process.env.PRIVATE_KEY);
}

export async function initWallet2() {
  return initWallet(process.env.PRIVATE_KEY_2);
}

export async function initWallet3() {
  return initWallet(process.env.PRIVATE_KEY_3);
}
