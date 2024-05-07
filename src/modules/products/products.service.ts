import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ERROR_MESSAGES, LUIZA_API } from 'src/shared/constants';
import { IProduct } from './model/interfaces/product.interface';
import { IProducts } from './model/interfaces/products.interface';

@Injectable()
export class ProductService {
  constructor(private httpService: HttpService) {}

  async getAllProducts(page: number): Promise<IProducts> {
    const url = `${LUIZA_API.ALL_PRODUCTS}/?page=${page}`;
    try {
      const { data } = await this.httpService.axiosRef.get<IProducts>(url);
      return data;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND);
    }
  }

  async getProduct(id: string): Promise<IProduct> {
    const url = `${LUIZA_API.PRODUCT_DETAILED}/${id}/`;
    try {
      const { data } = await this.httpService.axiosRef.get<IProduct>(url);
      return data;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND);
    }
  }
}
