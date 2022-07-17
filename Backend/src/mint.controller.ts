import {Controller,Get} from '@nestjs/common';
  import {
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
  
  import { AppService } from './app.service';

  @ApiTags('Mint')
  @Controller()
  export class mintController {
    constructor(private readonly appService: AppService) {}
  
    @Get('mint')
    @ApiOperation({
      summary: 'Mint NFTaa',
      description: 'Mint all NFTs',
    })
    @ApiResponse({
      status: 200,
      description: 'Minted',
      type: Boolean,
    })
    async mint() {
      try {
        return this.appService.mint();
      } catch (error) {
        return error;
      }
    }
  
  }
  