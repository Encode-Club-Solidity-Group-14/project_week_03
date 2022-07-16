import { ApiProperty } from '@nestjs/swagger';

export class MetadataDto {
  @ApiProperty({
    required: true,
    description: 'Name of this object',
    examples: ['Foo', 'Bar', 'Steven'],
  })
  Background: string;
  @ApiProperty({
    required: false,
    description: 'Background Colour',
  })
  Left_Eye?: string;
  @ApiProperty({
    required: false,
    description: 'Left eye attribute',
  })
  Face?: string;
  @ApiProperty({
    required: false,
    description: 'Face',
  })
  Right_Eye?: string;
  @ApiProperty({
    required: false,
    description: 'Right Eye',
    examples: ['Document', 'Meme', 'Dolphin', 'Undefined'],
  })
  Mouth?: string;
  @ApiProperty({
    required: false,
    description: 'Mouth',
    examples: [
      'Legendary',
      'Common',
      'Confidential',
      'Round',
      'Large',
      'Warrior',
      'Hyena',
      'Steven',
    ],
  })
  Accessory?: string;
  @ApiProperty({
    required: false,
    description: 'Accessory',
    examples: [0, -1, 42, 9876543210],
  })
  score?: number;
}
