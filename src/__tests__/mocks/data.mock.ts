import { UserPayload } from 'src/modules/users/models/payload/users.payload';
import { LoginDTO } from '../../modules/authentication/model/dto/login.dto';
import { UserDTO } from '../../modules/users/models/dto/users.dto';
import { UpdateUserDTO } from '../../modules/users/models/dto/update-user.dto';
import { ExtendedUserPayload } from './interfaces/data.interfaces.mock';

export const mockedJwtToken = { access_token: 'mocked_token' };

export const mockUserDTO: UserDTO = {
  name: 'User Test',
  email: 'test@test.com',
  password: 'xzxgptcW1!',
};

export const mockUpdateUserDTO: UpdateUserDTO = {
  name: 'User Updated',
  password: 'xzxgptcW1!',
};

export const mockLoginUserDTO: LoginDTO = {
  email: 'test@test.com',
  password: 'xzxgptcW1!',
};

export const mockUserPayload: UserPayload = {
  name: 'User Test',
  email: 'test@test.com',
  password: '$2b$11$aY9/KSDXsVqpNlrk7k15Yuy64Q5ad/NrZaA/lTGOGQK89sNGY6Icy',
  wishlist: [],
  roles: ['ROLE_USER'],
  createdAt: '04:47:53 GMT-0300 (Brasilia Standard Time)',
  updatedAt: '04:47:53 GMT-0300 (Brasilia Standard Time)',
};

export const mockUpdatedUserPayload: ExtendedUserPayload = {
  _id: '663c6b9431b8a8ca062202d8',
  name: 'User Updated',
  email: 'test@test.com',
  wishlist: [],
  roles: ['ROLE_USER'],
  createdAt: '04:47:53 GMT-0300 (Brasilia Standard Time)',
  updatedAt: '04:47:53 GMT-0300 (Brasilia Standard Time)',
};
