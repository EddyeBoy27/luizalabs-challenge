import { PartialType } from '@nestjs/swagger';
import { User } from '../schemas/users.schema';

export class UserPayload extends PartialType(User) {
  createdAt?: string;
  updatedAt?: string;
}
