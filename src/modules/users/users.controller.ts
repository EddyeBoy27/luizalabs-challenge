import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserPayload } from '../models/payload/users.payload';
import { UserDTO } from '../models/dto/users.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller({
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'User created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 409, description: 'User already exists.' })
  async createUser(@Body() body: UserDTO): Promise<UserPayload> {
    const createdUser = await this.usersService.createUser(body);
    return createdUser;
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Ok.' })
  async getAllUsers(): Promise<UserPayload[]> {
    const users = await this.usersService.getAllUsers();
    return users;
  }
}
