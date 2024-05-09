import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { ObjectId } from 'mongoose';
import { ERROR_MESSAGES } from '../../shared/constants';

@Injectable()
export class WishListService {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UsersService,
  ) {}

  async addNewItem(userId: ObjectId, productId: ObjectId): Promise<void> {
    const itemExist = await this.productService.getProduct(productId);

    const userHasItem = await this.userService.userHasItem(userId, productId);

    if (userHasItem) {
      throw new ConflictException(ERROR_MESSAGES.ALREADY_EXISTS);
    }
    await this.userService.updateWishlistUser(userId, itemExist);
  }

  async removeItem(userId: ObjectId, productId: ObjectId): Promise<void> {
    const userHasItem = await this.userService.userHasItem(userId, productId);
    if (!userHasItem) {
      throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND);
    }

    await this.userService.removeWishListUser(userId, productId);
  }
}
