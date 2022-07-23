import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Response,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Express } from "express";
import { Blob } from "buffer";
import { AppService } from "./app.service";
import { FileDataDto } from "./dtos/file-data.dto";
import { SetMetadataDto } from "./dtos/set-metadata.dto";
import { UploadIpfsDto } from "./dtos/upload-ipfs.dto";
import { NftMetadataDto } from "./dtos/nft.dto";

@ApiTags("NFT")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/nfts")
  @ApiOperation({
    summary: "NFTs contents",
    description: "Gets all NFT",
  })
  @ApiResponse({
    status: 200,
    description: "NFTs contents",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error.",
    type: HttpException,
  })
  async getAllData() {
    try {
      const result = this.appService.getAll();
      return result;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get("nfts/:id")
  @ApiOperation({
    summary: "Get element by id",
    description: "Gets the element at the requested index",
  })
  @ApiResponse({
    status: 200,
    description: "Element",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error.",
    type: HttpException,
  })
  async getData(@Param("id") id: number) {
    try {
      const result = this.appService.get(id);
      return result;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Post("nfts")
  @ApiOperation({
    summary: "Register NFT",
    description: "Registers a NFT",
  })
  @ApiResponse({
    status: 200,
    description: "NFT registered",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error.",
    type: HttpException,
  })
  createNFT(@Body() body: NftMetadataDto) {
    const updatedObj = this.appService.createNft(body.metadata);
    return updatedObj;
  }

  @Post("nfts/:id/image")
  @ApiOperation({
    summary: "Register NFT file",
    description: "Registers a file in the database",
  })
  @ApiResponse({
    status: 200,
    description: "File registered",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error.",
    type: HttpException,
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor("file"))
  uploadNFTFile(
    @UploadedFile() file: Express.Multer.File,
    @Param("id") id: number
  ) {
    const fileData = new FileDataDto(
      file.originalname,
      file.mimetype,
      file.filename,
      file.size
    );
    id = Number(id);
    let p = this.appService.pushFileToNft(id, fileData);
    const updatedObj = this.appService.saveToIpfs(id);
    return updatedObj;
  }
}
