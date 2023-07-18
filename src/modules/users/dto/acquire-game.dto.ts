import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AcquireGameDto {
  @ApiProperty({ description: 'The user id.' })
  user_id: number;

  @ApiProperty({ description: 'The game id.' })
  game_id: number;
}
