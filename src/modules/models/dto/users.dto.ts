import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDTO {
  @ApiProperty({
    description: 'Users name',
    example: 'User Test',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User email will access app',
    example: 'test@test.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'User password, must contain at least one uppercase letter, one number, and one special character(!, @, #, $, %, ^, &, *',
    example: 'xzxgptcW1!',
    required: true,
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @MaxLength(12, { message: 'Password must not exceed 12 characters.' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one number, and one special character (!, @, #, $, %, ^, &, *).',
    },
  )
  password: string;

  @ApiProperty({
    description: 'Authorization on app routes',
    example: '["ROLE_USER"]',
    required: true,
  })
  @IsString({ each: true })
  @IsIn(['ROLE_ADMIN', 'ROLE_USER'], {
    each: true,
    message: 'Invalid role provided.',
  })
  roles: string[];
}

export class UpdateUserDTO extends OmitType(UserDTO, ['password'] as const) {}
