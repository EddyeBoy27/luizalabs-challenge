import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './products.service';
import { IProduct } from './model/interfaces/product.interface';
import { IProducts } from './model/interfaces/products.interface';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller({ path: 'product' })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'OK.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async getAllProducts(@Query('page') page: number): Promise<IProducts> {
    const products = await this.productService.getAllProducts(page);
    return products;
  }

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'OK.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async getProduct(@Param('id') id: string): Promise<IProduct> {
    const product = await this.productService.getProduct(id);
    return product;
  }
}
