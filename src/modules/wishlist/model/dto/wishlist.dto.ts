import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class WishListDTO {
  @ApiProperty({
    description: 'Users ID',
    example: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',
    required: true,
  })
  @IsMongoId()
  clientId: ObjectId;

  @ApiProperty({
    description: 'Product ID',
    example: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',
    required: true,
  })
  @IsMongoId()
  productId: ObjectId;
}
