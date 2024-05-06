import {
  IsEmail,
  IsIn,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

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

  @IsString({ each: true })
  @IsIn(['ROLE_ADMIN', 'ROLE_USER'], {
    each: true,
    message: 'Invalid role provided.',
  })
  roles: string[];
}
