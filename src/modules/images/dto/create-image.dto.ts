import { IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ImageTypes {
  Catalog = 'catalog',
  Header = 'header',
  Screenshot = 'screenshot',
}

export class CreateImageDto {
  @ApiProperty({ description: 'The image url.' })
  @IsNotEmpty()
  url: string;

  @ApiProperty({ description: 'The image alt text.' })
  alt_text: string;

  @ApiProperty({
    description: 'The image type (catalog, header, screenshot.',
    enum: ImageTypes,
  })
  @IsEnum(ImageTypes)
  @IsNotEmpty()
  type:string;

  @ApiProperty({ description: 'The game id - only needed if it is a catalog or header image.' })
  game_id: number;
}
