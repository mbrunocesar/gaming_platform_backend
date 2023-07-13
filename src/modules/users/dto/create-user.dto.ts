import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The user name.' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The email from user.' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The encoded password from user.' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Is this user a developer?' })
  @IsNotEmpty()
  developer: boolean;
}
