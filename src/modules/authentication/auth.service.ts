import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { UserPayload } from '../users/models/payload/users.payload';
import { ERROR_MESSAGES } from '../../shared/constants';
import { IJwtToken } from './model/interfaces/jwt-token.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserPayload> {
    try {
      const user = await this.userService.getUserByEmail(email, '+password');
      if (!user) {
        throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND);
      }

      const isPassValid = await bcrypt.compare(password, user.password);

      if (!isPassValid) {
        throw new UnauthorizedException(ERROR_MESSAGES.UNAUTHORIZED);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _password, ...userData } = user;
      return userData;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }

      console.error(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error);

      throw new InternalServerErrorException(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signIn(user: any): Promise<IJwtToken> {
    const payload = {
      userId: user._id,
      sub: user.name,
      email: user.email,
      roles: user.roles,
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validateUserToken(token: string): Promise<UserPayload> {
    const decoded = await this.jwtService.verifyAsync<UserPayload>(token, {
      secret: this.configService.get<string>('api.secret'),
    });
    return decoded;
  }
}
