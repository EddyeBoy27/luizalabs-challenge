import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from './models/schemas/users.schema';
import { UserDTO } from './models/dto/users.dto';
import { UserPayload } from './models/payload/users.payload';
import { UpdateUserDTO } from './models/dto/update-user.dto';
import { ERROR_MESSAGES, ROLES } from '../../shared/constants';
import { useHashPassword } from '../../utils/useHashPassword';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(body: UserDTO): Promise<UserPayload> {
    const { password, ...bodyData } = body;
    const userExist = await this.getUserByEmail(bodyData.email);

    if (userExist) {
      throw new ConflictException(`User ${bodyData.email} already exists.`);
    }
    const hashedPassword = await useHashPassword(password);
    const createdUser = new this.userModel({
      ...bodyData,
      password: hashedPassword,
    });
    const user = (await createdUser.save())?.toObject();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userData } = user;
    return userData;
  }

  async getAllUsers(): Promise<UserPayload[]> {
    const users = this.userModel.find();
    return users;
  }

  async getUserByEmail(email: string, query?: string): Promise<UserPayload> {
    const user = (
      await this.userModel.findOne({ email: email }).select(query).exec()
    )?.toObject();

    return user;
  }

  async getUserById(id: ObjectId): Promise<UserPayload> {
    const user = (await this.userModel.findOne({ _id: id }).exec())?.toObject();

    return user;
  }

  async updateUser(id: ObjectId, body: UpdateUserDTO): Promise<UserPayload> {
    const user = await this.getUserById(id);

    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND);
    }

    const hashedPassword = await useHashPassword(body.password);

    const updatedUser = await this.userModel
      .findOneAndUpdate(
        { _id: id },
        { name: body.name, password: hashedPassword },
        { new: true },
      )
      .exec();
    return updatedUser;
  }

  async deleteUser(userId: ObjectId, id: ObjectId): Promise<void> {
    const user = await this.getUserById(userId);

    if (user?.roles.includes(ROLES.USER)) {
      await this.userModel.findByIdAndUpdate({ _id: userId }).exec();
    }

    await this.userModel.findByIdAndDelete({ _id: id }).exec();
  }
}
