import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Request } from 'express';
import { UsersService } from './users.service';
import { UserPayload } from './models/payload/users.payload';
import { UserDTO } from './models/dto/users.dto';
import { UpdateUserDTO } from './models/dto/update-user.dto';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { RolesGuard } from '../authentication/guards/role.guard';
import { Roles } from '../authentication/decorator/roles.decorator';
import { ERROR_MESSAGES, ROLES } from '../../shared/constants';
import { DeleteUserDTO } from './models/dto/delete-user.dto';

@ApiTags('Users')
@Controller({
  path: 'users',
})
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'User created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 409, description: 'User already exists.' })
  async createUser(@Body() body: UserDTO): Promise<UserPayload> {
    const createdUser = await this.userService.createUser(body);
    return createdUser;
  }

  @Get()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({ status: 200, description: 'OK.' })
  async getAllUsers(): Promise<UserPayload[]> {
    const users = await this.userService.getAllUsers();
    return users;
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'OK.' })
  async getUser(
    @Param('id') id: ObjectId,
    @Req() req: Request,
  ): Promise<UserPayload> {
    const {
      user: { roles, userId },
    } = req;

    if (roles.includes(ROLES.USER)) {
      return this.userService.getUserById(userId);
    }

    const user = await this.userService.getUserById(id).catch(() => {
      throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND);
    });
    return user;
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'OK.' })
  async updateUser(
    @Req() req: Request,
    @Body() body: UpdateUserDTO,
  ): Promise<UserPayload> {
    const {
      user: { userId },
    } = req;

    const updatedUser = await this.userService.updateUser(userId, body);
    return updatedUser;
  }

  @Delete()
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 204, description: 'No content.' })
  async deleteUser(
    @Req() req: Request,
    @Body() body: DeleteUserDTO,
  ): Promise<void> {
    const {
      user: { userId },
    } = req;
    const { id } = body;
    await this.userService.deleteUser(userId, id);
    return;
  }
}
