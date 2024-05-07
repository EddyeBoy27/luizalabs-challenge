import { Controller } from '@nestjs/common';
import { WishListService } from './wishlist.service';

@Controller({ path: 'wishlist' })
export class WishListController {
  constructor(private readonly wishListService: WishListService) {}
}
