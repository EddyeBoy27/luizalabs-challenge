import { Schema } from 'mongoose';
import { Request } from 'express';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { UsersService } from '../../modules/users/users.service';
import { User } from '../../modules/users/models/schemas/users.schema';
import { MockUsersModel } from '../mocks/models/users.model.mock';
import { MockJwtService } from '../mocks/services/jwt.service.mock';
import { AuthService } from '../../modules/authentication/auth.service';
import { WishListController } from '../../modules/wishlist/wishlist.controller';
import { WishListService } from '../../modules/wishlist/wishlist.service';
import { ProductService } from '../../modules/products/products.service';
import { mockProductDetailed } from '../mocks/data/data.mock';

describe('WishlistController', () => {
  let wishlistController: WishListController;
  let usersService: UsersService;
  let httpService: HttpService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WishListController],
      providers: [
        UsersService,
        AuthService,
        ConfigService,
        ProductService,
        WishListService,
        {
          provide: getModelToken(User.name),
          useValue: MockUsersModel,
        },
        {
          provide: JwtService,
          useValue: MockJwtService,
        },
      ],
      imports: [HttpModule],
    }).compile();

    wishlistController = app.get<WishListController>(WishListController);
    usersService = app.get<UsersService>(UsersService);
    httpService = app.get<HttpService>(HttpService);
  });

  it('WishlistController should be defined', () => {
    expect(wishlistController).toBeDefined();
  });

  describe('WishlistController', () => {
    describe('Success', () => {
      it('Should add a new item on users wishlist', async () => {
        const id = new Schema.Types.ObjectId(
          '1c95d400-9847-eda3-de07-0e62d80a30c6',
        );

        const request: Request = {
          user: {
            userId: id,
          },
        } as Request;

        const body = {
          productId: id,
        };

        const updatedProductSpy = jest.spyOn(
          usersService['userModel'],
          'findByIdAndUpdate',
        );

        jest
          .spyOn(httpService.axiosRef, 'get')
          .mockResolvedValue({ data: mockProductDetailed });

        await wishlistController.addNewItem(request, body);

        expect(updatedProductSpy).toHaveBeenCalled();
      });

      it('Try add a new item on wishlist but persist user previous wishlist', async () => {
        const id = new Schema.Types.ObjectId(
          '1c95d400-9847-eda3-de07-0e62d80a30c6',
        );

        const request: Request = {
          user: {
            userId: id,
          },
        } as Request;

        const body = {
          productId: id,
        };

        const updatedWishlistSpy = jest.spyOn(
          usersService['userModel'],
          'findByIdAndUpdate',
        );

        jest
          .spyOn(httpService.axiosRef, 'get')
          .mockResolvedValue({ data: false });

        await wishlistController.addNewItem(request, body);

        expect(updatedWishlistSpy).toHaveBeenCalled();
      });

      it('Try remove a item on wishlist', async () => {
        const id = new Schema.Types.ObjectId(
          '1c95d400-9847-eda3-de07-0e62d80a30c6',
        );

        const request: Request = {
          user: {
            userId: id,
          },
        } as Request;

        const body = {
          productId: id,
        };

        jest.spyOn(usersService, 'userHasItem').mockResolvedValue(true);

        const updatedWishlistSpy = jest.spyOn(
          usersService['userModel'],
          'findByIdAndUpdate',
        );

        await wishlistController.removeItem(request, body);

        expect(updatedWishlistSpy).toHaveBeenCalled();
      });
    });

    describe('Fails', () => {
      it('Throws Conflict when try add item wishlist', async () => {
        const id = new Schema.Types.ObjectId(
          '1c95d400-9847-eda3-de07-0e62d80a30c6',
        );

        const request: Request = {
          user: {
            userId: id,
          },
        } as Request;

        const body = {
          productId: id,
        };

        jest.spyOn(usersService, 'userHasItem').mockResolvedValue(true);

        const addNew = async () => {
          await wishlistController.addNewItem(request, body);
        };

        await expect(addNew).rejects.toThrow(ConflictException);
      });

      it('Throw Not Found if try to remove item does not exist in wishlist', async () => {
        const id = new Schema.Types.ObjectId(
          '1c95d400-9847-eda3-de07-0e62d80a30c6',
        );

        const request: Request = {
          user: {
            userId: id,
          },
        } as Request;

        const body = {
          productId: id,
        };

        jest.spyOn(usersService, 'userHasItem').mockResolvedValue(false);

        const removeExist = async () => {
          await wishlistController.removeItem(request, body);
        };

        await expect(removeExist).rejects.toThrow(NotFoundException);
      });

      // it('Throw Not Found if try to remove item and user does not exists', async () => {
      //   const id = new Schema.Types.ObjectId(
      //     '1c95d400-9847-eda3-de07-0e62d80a30c6',
      //   );

      //   const request: Request = {
      //     user: {
      //       userId: id,
      //     },
      //   } as Request;

      //   const body = {
      //     productId: id,
      //   };

      //   jest.spyOn(console, 'error').mockImplementation(() => {});

      //   jest.spyOn(usersService, 'getUserById').mockRejectedValue(new Error());

      //   const removeExist = async () => {
      //     await wishlistController.removeItem(request, body);
      //   };

      //   await expect(removeExist).rejects.toThrow(NotFoundException);
      // });
    });
  });
});
