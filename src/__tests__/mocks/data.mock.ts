import { UserPayload } from 'src/modules/users/models/payload/users.payload';
import { LoginDTO } from '../../modules/authentication/model/dto/login.dto';

export const mockedJwtToken = { access_token: 'mocked_token' };
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
  createdAt: new Date().toTimeString(),
  updatedAt: new Date().toTimeString(),
};
