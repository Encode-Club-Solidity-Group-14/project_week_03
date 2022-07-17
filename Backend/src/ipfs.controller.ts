import {Controller,Get} from '@nestjs/common';
  import {
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
  
  import { AppService } from './app.service';

  @ApiTags('IPFS')
  @Controller()
  export class ipfsController {
    constructor(private readonly appService: AppService) {}
  
    @Get('ipfs')
    @ApiOperation({
      summary: 'IPFS node connection',
      description: 'Returns true if the IPFS Node configured is running',
    })
    @ApiResponse({
      status: 200,
      description: 'IPFS Node connection',
      type: Boolean,
    })
    async ipfsOnline() {
      try {
        return this.appService.isIpfsNodeOnline();
      } catch (error) {
        return error;
      }
    }
  
  }
  