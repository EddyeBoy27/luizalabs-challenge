import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { WishListController } from './wishlist.controller';
import { WishListService } from './wishlist.service';
import { ProductModule } from '../products/products.module';
import { AuthModule } from '../authentication/auth.module';

@Module({
  imports: [UsersModule, ProductModule, AuthModule],
  controllers: [WishListController],
  providers: [WishListService],
  exports: [WishListService],
})
export class WishListModule {}
