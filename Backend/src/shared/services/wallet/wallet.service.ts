import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class WalletService {
  wallet: ethers.Wallet;

  constructor() {
    this.setupWallet();
  }

  setupWallet() {
    //const seed = process.env.ADMIN_WALLET_SEED;
    const pk = process.env.PRIVATE_KEY;
   // if (!seed || seed.length === 0) return;
   // this.wallet = ethers.Wallet.fromMnemonic(seed);
   let provider = ethers.getDefaultProvider();
   this.wallet = new ethers.Wallet(pk, provider);
  }

  walletAddress() {
    return this.wallet.address;
  }
}
