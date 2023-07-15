import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiProperty({ description: 'The game url.' })
  @IsNotEmpty()
  url: string;

  @ApiProperty({ description: 'The game title.' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The game description.' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The game short_description.' })
  @IsNotEmpty()
  short_description: string;

  @ApiProperty({ description: 'The game author name.' })
  @IsNotEmpty()
  author: string;

  @ApiProperty({ description: 'The game operating_system.' })
  @IsNotEmpty()
  operating_system: string;

  @ApiProperty({ description: 'The game launch_date.' })
  @IsNotEmpty()
  launch_date: Date;

  @ApiProperty({ description: 'The game price_in_cents.' })
  @IsNotEmpty()
  price_in_cents: number;

  @ApiProperty({ description: 'The game creator.' })
  developer_id: number;

  @ApiProperty({ description: 'The game creator.' })
  image_ids: number[];
}
