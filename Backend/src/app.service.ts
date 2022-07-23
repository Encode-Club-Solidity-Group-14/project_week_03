import { Injectable, StreamableFile } from "@nestjs/common";
import * as fs from "fs";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import { FileDataDto } from "./dtos/file-data.dto";
import { MetadataDto } from "./dtos/metadata.dto";
import { FileData } from "./schemas/file-data.interface";
import { create } from "ipfs-http-client";
import { createReadStream } from "fs";
import { BigNumber, ethers } from "ethers";
import { IPFSHTTPClient } from "ipfs-http-client/types/src/types";
import { concat as uint8ArrayConcat } from "uint8arrays/concat";
import * as nftJson from "src/assets/NFT.json";
import { ProviderService } from "./shared/services/provider/provider.service";
import { SignerService } from "./shared/services/signer/signer.service";

const DB_PATH = "../db/db.json";

@Injectable()
export class AppService {
  db: JsonDB;
  lastId: number;
  ipfsClient: IPFSHTTPClient;
  contractSignedInstance: ethers.Contract;

  constructor(
    private providerService: ProviderService,
    private signerService: SignerService
  ) {
    this.db = new JsonDB(new Config(DB_PATH, true, true, "/"));
    this.ipfsClient = create({
      host: "localhost",
      port: 5001,
      protocol: "http",
    });
    const data = this.db.getData("/");
    this.lastId =
      data && Object.keys(data).length > 0
        ? Math.max(...Object.keys(data).map((key) => Number(key)))
        : -1;

    this.setupContractInstances();
  }

  setupContractInstances() {
    const contractAddress = process.env.TOKEN_CONTRACT_ADDRESS;
    console.log("address");
    console.log(contractAddress);
    if (!contractAddress || contractAddress.length === 0) return;
    this.contractSignedInstance = new ethers.Contract(
      contractAddress,
      nftJson.abi,
      this.signerService.signer
    );
  }

  pushFileToNft(fileId: number, file: FileDataDto) {
    try {
      const metadata = this.get(fileId);
      if (!metadata) return false;
      const obj = new FileData(file);
      this.db.push(`/${fileId}`, { ...obj, ...metadata });
      return this.get(fileId);
    } catch (error) {
      return { error };
    }
  }

  createNft(metadata: MetadataDto) {
    const nftId = ++this.lastId;
    this.db.push(`/${nftId}/metadata`, metadata);
    return nftId;
  }

  getAll() {
    return this.db.getData("/");
  }

  get(fileId: number) {
    return this.db.getData(`/${fileId}`);
  }

  isIpfsNodeOnline() {
    try {
      const state = this.ipfsClient.isOnline();
      return state;
    } catch (error) {
      return error;
    }
  }

  async mint() {
    for (let i = 0; i <= this.lastId; i++) {
      const nftURI = "https://ipfs.io/ipfs/" + this.get(i).ipfs.path;

      const add = await this.contractSignedInstance.address;
      console.log(add);
      //const balanceOf = await this.contractSignedInstance.balanceOf("0xfb542204Ed21212258a8DD6288C96676970382B7");
      //console.log(balanceOf);
      console.log("Minting... ");
      console.log("to address: 0xfb542204Ed21212258a8DD6288C96676970382B7");
      console.log("tokenId: " + BigNumber.from(i));
      console.log("nftURI: " + nftURI);
      const tx = await this.contractSignedInstance.safeMint(
        "0xfb542204Ed21212258a8DD6288C96676970382B7",
        BigNumber.from("10"),
        nftURI
      );

      console.log("Minted: " + tx);
    }
  }

  async saveToIpfs(fileId: number) {
    const fileData: FileData = this.get(fileId);
    const fileLocation = `../upload/${fileData.file.storageName}`;
    const fileBytes = fs.readFileSync(fileLocation);
    const ipfsData = await this.ipfsClient.add(fileBytes);
    this.db.push(`/${fileId}/ipfs`, { ...ipfsData });
    return this.get(fileId);
  }

  async getFromIpfs(fileId: number) {
    const fileData: FileData = this.get(fileId);
    if (!fileData.ipfs || !fileData.ipfs.path || fileData.ipfs.path.length == 0)
      throw new Error("File not found");
    const ipfsBytes = this.ipfsClient.cat(fileData.ipfs.path);
    const content = [];
    for await (const chunk of ipfsBytes) {
      content.push(chunk);
    }
    const fileStream = uint8ArrayConcat(content);
    return new StreamableFile(fileStream);
  }
}
