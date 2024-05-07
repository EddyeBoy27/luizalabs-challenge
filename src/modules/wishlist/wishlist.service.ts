import { Injectable } from '@nestjs/common';
import { ProductService } from '../products/products.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class WishListService {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UsersService,
  ) {}
}
