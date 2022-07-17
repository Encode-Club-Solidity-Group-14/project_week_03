import { ApiProperty } from '@nestjs/swagger';
import { MetadataDto } from './metadata.dto';

export class NftMetadataDto {
  @ApiProperty({
    required: true,
    description: 'NFT metadata',
    type: MetadataDto
  })
  metadata: MetadataDto;
}
