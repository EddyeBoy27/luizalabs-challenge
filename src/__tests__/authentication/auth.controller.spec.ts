import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../modules/authentication/auth.service';
import { AuthController } from '../../modules/authentication/auth.controller';
import { mockLoginUserDTO, mockedJwtToken } from '../mocks/data/data.mock';
import { UsersService } from '../../modules/users/users.service';
import { MockUsersModel } from '../mocks/models/users.model.mock';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../../modules/users/models/schemas/users.schema';
import { getModelToken } from '@nestjs/mongoose';
import { MockJwtService } from '../mocks/services/jwt.service.mock';
import {
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let usersService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [
        AuthService,
        ConfigService,
        UsersService,
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

    authController = app.get<AuthController>(AuthController);
    usersService = app.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('AuthController should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('Login', () => {
    describe('Login Success', () => {
      it('Should return JWT token if user and password is provided', async () => {
        const signIn = await authController.login(mockLoginUserDTO);

        expect(signIn).toEqual(mockedJwtToken);
      });
    });

    describe('Login Fails', () => {
      it('Should return statusCode(404) if email does not exist', async () => {
        jest.spyOn(usersService, 'getUserByEmail').mockResolvedValue(null);

        const signIn = async () => {
          await authController.login({
            email: 'lala@lala.com',
            password: 'xzxgptcW1!',
          });
        };

        await expect(signIn).rejects.toThrow(NotFoundException);
      });

      it('Should return statusCode(401) if password is invalid', async () => {
        const mockUser = {
          email: 'test@test.com',
          password:
            '$2b$10$123456789012345678901uP2d1sZP1IU1/Uq1dPNjBcmNUy3jlE0G',
        };

        jest.spyOn(usersService, 'getUserByEmail').mockResolvedValue(mockUser);

        const signIn = async () => {
          await authController.login({
            email: 'test@test.com',
            password: 'incorrect-passW!1',
          });
        };

        await expect(signIn).rejects.toThrow(UnauthorizedException);
      });

      it('Should return statusCode(500) if throw internal server exception', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});

        jest.spyOn(usersService, 'getUserByEmail').mockImplementation(() => {
          throw new Error('Unexpected error.');
        });

        const signIn = async () => {
          await authController.login({
            email: 'test@test.com',
            password: 'incorrect-passW!1',
          });
        };

        await expect(signIn).rejects.toThrow(InternalServerErrorException);
      });
    });
  });
});
