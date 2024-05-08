import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IProduct } from '../../../../modules/products/model/interfaces/product.interface';
import { ROLES } from '../../../../shared/constants';

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
    description: 'Lista de produtos favoritos',
    example: {
      price: 1699,
      image:
        'http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg',
      brand: 'bébé confort',
      id: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',
      title: 'Cadeira para Auto Iseos Bébé Confort Earth Brown',
    },
    required: false,
  })
  wishlist?: IProduct[];

  @ApiProperty({
    description: 'Authorization on app routes',
    example: '["ROLE_USER"]',
    required: true,
  })
  @IsString({ each: true })
  @IsIn([ROLES.USER], {
    each: true,
    message: 'Invalid role provided.',
  })
  roles: string[];
}

export class UpdateUserDTO extends OmitType(UserDTO, ['password'] as const) {}
