import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FiltersDto {
  @ApiProperty({ description: 'The game title.', required: false })
  title: string;

  @ApiProperty({ description: 'The game launch_date is newer than limit.', required: false })
  launch_date_newer: Date;

  @ApiProperty({ description: 'The game launch_date is older than limit.', required: false })
  launch_date_older: Date;

  @ApiProperty({ description: 'The game price_in_cents lowest value.', required: false })
  price_in_cents_lower: number;

  @ApiProperty({ description: 'The game price_in_cents highest value.', required: false })
  price_in_cents_higher: number;

  @ApiProperty({ description: 'The game genre ids.', required: false })
  genre_ids: number[];
}
