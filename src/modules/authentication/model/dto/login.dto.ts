import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    description: 'User email to login',
    example: 'test@test.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password to login',
    example: 'asdhuasd!@#!WQE',
    required: true,
  })
  @IsString()
  password: string;
}
