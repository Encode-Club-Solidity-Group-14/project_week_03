import { ApiProperty } from '@nestjs/swagger';

export class MetadataDto {
  @ApiProperty({
    required: true,
    description: 'Name of this object',
    examples: ['Foo', 'Bar', 'Steven'],
  })
  background: string;
  @ApiProperty({
    required: false,
    description: 'Background Colour',
  })
  left_eye?: string;
  @ApiProperty({
    required: false,
    description: 'Left eye attribute',
  })
  face?: string;
  @ApiProperty({
    required: false,
    description: 'Face',
  })
  right_eye?: string;
  @ApiProperty({
    required: false,
    description: 'Right Eye',
    examples: ['Document', 'Meme', 'Dolphin', 'Undefined'],
  })
  mouth?: string;
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
  accessory?: string;
  @ApiProperty({
    required: false,
    description: 'Accessory',
    examples: [0, -1, 42, 9876543210],
  })
  score?: number;
}
