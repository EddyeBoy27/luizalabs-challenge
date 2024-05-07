import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { HttpModule } from '@nestjs/axios';
import { ProductController } from './products.controller';

@Module({
  imports: [HttpModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
