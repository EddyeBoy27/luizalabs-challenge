import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Schema } from 'mongoose';
import { Request } from 'express';
import { UsersController } from '../../modules/users/users.controller';
import { UsersService } from '../../modules/users/users.service';
import { User } from '../../modules/users/models/schemas/users.schema';
import { MockUsersModel } from '../mocks/models/users.model.mock';
import { MockJwtService } from '../mocks/services/jwt.service.mock';
import { AuthService } from '../../modules/authentication/auth.service';
import {
  mockUpdateUserDTO,
  mockUpdatedUserPayload,
  mockUserDTO,
  mockUserPayload,
} from '../mocks/data.mock';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        AuthService,
        ConfigService,
        {
          provide: getModelToken(User.name),
          useValue: MockUsersModel,
        },
        {
          provide: JwtService,
          useValue: MockJwtService,
        },
      ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
  });

  it('UsersController should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('Create User', () => {
    describe('Success', () => {
      it('Should create new user', async () => {
        jest.spyOn(usersService, 'getUserByEmail').mockResolvedValue(null);

        const newUser = await usersController.createUser(mockUserDTO);

        expect(newUser).toEqual({
          _id: '663c6a246813f0c3b6a4d282',
          name: 'User Test',
          email: 'test@test.com',
          wishlist: [],
          roles: ['ROLE_USER'],
          createdAt: '04:47:53 GMT-0300 (Brasilia Standard Time)',
          updatedAt: '04:47:53 GMT-0300 (Brasilia Standard Time)',
        });
      });

      it('Should get all users', async () => {
        const allUsers = await usersController.getAllUsers();

        expect(allUsers).toEqual([mockUserPayload]);
      });

      it('Should get user as ROLE_ADMIN', async () => {
        const userId = new Schema.Types.ObjectId('663c6b9431b8a8ca062202d8');
        const request: Request = {
          user: {
            roles: ['ROLE_ADMIN'],
            userId: userId,
          },
        } as Request;
        const users = await usersController.getUser(userId, request);

        expect(users).toEqual(mockUserPayload);
      });

      it('Should get user as ROLE_ADMIN', async () => {
        const userId = new Schema.Types.ObjectId('663c6b9431b8a8ca062202d8');
        const request: Request = {
          user: {
            roles: ['ROLE_USER'],
            userId: userId,
          },
        } as Request;
        const users = await usersController.getUser(userId, request);

        expect(users).toEqual(mockUserPayload);
      });

      it('Should Update User', async () => {
        const userId = new Schema.Types.ObjectId('663c6b9431b8a8ca062202d8');
        const request: Request = {
          user: {
            userId: userId,
          },
        } as Request;
        const updatedUser = await usersController.updateUser(
          request,
          mockUpdateUserDTO,
        );

        expect(updatedUser).toEqual(mockUpdatedUserPayload);
      });

      it('Should Delete User as ROLE_USER', async () => {
        const userId = new Schema.Types.ObjectId('663c6b9431b8a8ca062202d8');
        const request: Request = {
          user: {
            userId: userId,
          },
        } as Request;

        const body = {
          id: userId,
        };

        const deletedUserSpy = jest.spyOn(
          usersService['userModel'],
          'findByIdAndDelete',
        );

        await usersController.deleteUser(request, body);

        expect(deletedUserSpy).toHaveBeenCalled();
      });

      it('Should Delete User as ROLE_ADMIN', async () => {
        jest
          .spyOn(usersService, 'getUserById')
          .mockResolvedValue(mockUserPayload);
        const userId = new Schema.Types.ObjectId('663c6b9431b8a8ca062202d8');
        const request: Request = {
          user: {
            userId: userId,
          },
        } as Request;

        const body = {
          id: userId,
        };

        const deletedUserSpy = jest.spyOn(
          usersService['userModel'],
          'findByIdAndDelete',
        );

        await usersController.deleteUser(request, body);

        expect(deletedUserSpy).toHaveBeenCalled();
      });
    });

    describe('Fails', () => {
      it('Should throw Conflict when email already exists', async () => {
        const newUser = async () => {
          await usersController.createUser(mockUserDTO);
        };

        expect(newUser).rejects.toThrow(ConflictException);
      });

      it('Should throw Not Found when get user as ROLE_ADMIN', async () => {
        jest.spyOn(usersService, 'getUserById').mockRejectedValue(new Error());
        const userId = new Schema.Types.ObjectId('663c6b9431b8a8ca062202d8');
        const request: Request = {
          user: {
            roles: ['ROLE_ADMIN'],
            userId: userId,
          },
        } as Request;
        const users = async () => {
          await usersController.getUser(userId, request);
        };

        await expect(users).rejects.toThrow(NotFoundException);
      });

      it('Should Update User throw Not Found if user to update does not exist', async () => {
        jest.spyOn(usersService, 'getUserById').mockResolvedValue(null);
        const userId = new Schema.Types.ObjectId('663c6b9431b8a8ca062202d8');
        const request: Request = {
          user: {
            userId: userId,
          },
        } as Request;
        const updatedUser = async () => {
          await usersController.updateUser(request, mockUpdateUserDTO);
        };

        expect(updatedUser).rejects.toThrow(NotFoundException);
      });
    });
  });
});
