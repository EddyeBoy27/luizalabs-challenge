import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/schemas/users.schema';
import { Model } from 'mongoose';
import { UserDTO } from './models/dto/users.dto';
import * as bcrypt from 'bcrypt';
import { UserPayload } from './models/payload/users.payload';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(body: UserDTO): Promise<UserPayload> {
    const { password, ...bodyData } = body;
    const userExist = await this.userModel
      .findOne({ email: bodyData.email })
      .exec();

    if (userExist) {
      throw new ConflictException(`User ${bodyData.email} already exists.`);
    }
    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = new this.userModel({
      ...bodyData,
      password: hashedPassword,
    });
    const user = (await createdUser.save()).toObject();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userData } = user;
    return userData;
  }

  async getAllUsers(): Promise<UserPayload[]> {
    const users = this.userModel.find();
    return users;
  }
}
