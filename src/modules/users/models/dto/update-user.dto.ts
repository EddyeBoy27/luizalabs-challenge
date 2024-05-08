import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({
    description: 'Users name',
    example: 'User Test',
    required: true,
  })
  @IsString()
  name: string;

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
}
