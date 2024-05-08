import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class WishlistDTO {
  @ApiProperty({
    description: 'Product ID.',
    example: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',
    required: true,
  })
  @IsString()
  productId: ObjectId;
}
