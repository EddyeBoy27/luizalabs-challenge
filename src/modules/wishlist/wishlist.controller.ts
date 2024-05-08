import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WishListService } from './wishlist.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { WishlistDTO } from './model/dto/wishlist.dto';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';

@ApiTags('Wishlist')
@Controller({ path: 'wishlist' })
export class WishListController {
  constructor(private readonly wishListService: WishListService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, description: 'Created.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 409, description: 'Already Exists.' })
  @ApiBearerAuth()
  async addNewItem(
    @Req() req: Request,
    @Body() body: WishlistDTO,
  ): Promise<void> {
    const {
      user: { userId },
    } = req;
    const { productId } = body;
    await this.wishListService.addNewItem(userId, productId);
  }

  @Delete()
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 204, description: 'No content.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiBearerAuth()
  async removeItem(
    @Req() req: Request,
    @Body() body: WishlistDTO,
  ): Promise<void> {
    const {
      user: { userId },
    } = req;
    const { productId } = body;
    await this.wishListService.removeItem(userId, productId);
  }
}
