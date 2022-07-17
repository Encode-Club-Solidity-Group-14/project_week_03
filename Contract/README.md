# Weekend project Smart Contract

**Building**

```
yarn install
```

```
yarn hardhat compile
```

**Tests**

```
yarn hardhat test
```

**Coverage check**

```
npx hardhat coverage
```

//TODO: not working see whats is going on

# Scritps Usage

**Deploy**

Script: ``deploy.ts``

```
yarn ts-node --files .\scripts\deploy.ts
```

Token Contract deployed at [0xDe3c6f253Dc24d085DBD0858598558E237774BFB](https://ropsten.etherscan.io/tx/0xe553a5bac2a36e685c3e4810e634b52dc5819e64284acdd62f303e0041237bbc)

**Mint**

Script: ``mint.ts {nftContractAddress} {toAddress} {tokenId} {uri}``

```
yarn ts-node --files .\scripts\mint.ts 0xDe3c6f253Dc24d085DBD0858598558E237774BFB 0xfb542204Ed21212258a8DD6288C96676970382B7 1 https://hardhat.org/_next/static/media/hardhat-logo.5c5f687b.svg 
```

**Token URI by TokenId**

Script: ``tokenURI.ts {nftContractAddress} {tokenId}``

```
yarn ts-node --files .\scripts\tokenURI.ts 0xDe3c6f253Dc24d085DBD0858598558E237774BFB 1
```
****

**BalanceOf given address**
Script: ``balanceOf.ts {nftContractAddress} {tokenId} {owner}``

```
yarn ts-node --files .\scripts\balanceOf.ts 0xDe3c6f253Dc24d085DBD0858598558E237774BFB 0xfb542204Ed21212258a8DD6288C96676970382B7
```

**Burn by TokenId**

_notice that to run this script you need to provide the private key of the owner of the NFT_

Script: ``burn.ts {tokenId}``

```
yarn ts-node --files .\scripts\burn.ts 0xDe3c6f253Dc24d085DBD0858598558E237774BFB 1
```