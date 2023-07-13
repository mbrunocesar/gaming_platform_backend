import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'The email from user.' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The password from user.' })
  @IsNotEmpty()
  password: string;
}
