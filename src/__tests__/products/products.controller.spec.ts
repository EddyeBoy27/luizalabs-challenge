import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { NotFoundException } from '@nestjs/common';
import { Schema } from 'mongoose';
import { ProductController } from '../../modules/products/products.controller';
import { ProductService } from '../../modules/products/products.service';
import { mockProductDetailed, mockProductsList } from '../mocks/data/data.mock';

describe('ProductsController', () => {
  let productController: ProductController;
  let httpService: HttpService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
      imports: [HttpModule],
    }).compile();

    productController = app.get<ProductController>(ProductController);
    httpService = app.get<HttpService>(HttpService);
  });

  it('UsersController should be defined', () => {
    expect(productController).toBeDefined();
  });

  describe('Product Controller', () => {
    describe('Success', () => {
      it('Should return a list of products', async () => {
        const page = 1;

        jest
          .spyOn(httpService.axiosRef, 'get')
          .mockResolvedValue({ data: mockProductsList });

        const products = await productController.getAllProducts(page);

        expect(products).toEqual(mockProductsList);
      });

      it('Should return a product detailed', async () => {
        const productId = new Schema.Types.ObjectId(
          '1c95d400-9847-eda3-de07-0e62d80a30c6',
        );

        jest
          .spyOn(httpService.axiosRef, 'get')
          .mockResolvedValue({ data: mockProductDetailed });

        const products = await productController.getProduct(productId);

        expect(products).toEqual(mockProductDetailed);
      });
    });

    describe('Fails', () => {
      it('Should throw Not Found if get all products fails', async () => {
        const page = 1;

        jest.spyOn(console, 'error').mockImplementation(() => {});
        jest.spyOn(httpService.axiosRef, 'get').mockRejectedValue(new Error());

        const products = async () => {
          await productController.getAllProducts(page);
        };

        expect(products).rejects.toThrow(NotFoundException);
      });

      it('Should throw Not Found ig get product fails', async () => {
        const productId = new Schema.Types.ObjectId(
          '1c95d400-9847-eda3-de07-0e62d80a30c6',
        );

        jest.spyOn(console, 'error').mockImplementation(() => {});
        jest.spyOn(httpService.axiosRef, 'get').mockRejectedValue(new Error());

        const products = async () => {
          await productController.getProduct(productId);
        };

        expect(products).rejects.toThrow(NotFoundException);
      });
    });
  });
});
