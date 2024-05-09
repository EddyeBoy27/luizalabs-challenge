import { UserPayload } from '../../../modules/users/models/payload/users.payload';
import { LoginDTO } from '../../../modules/authentication/model/dto/login.dto';
import { UserDTO } from '../../../modules/users/models/dto/users.dto';
import { UpdateUserDTO } from '../../../modules/users/models/dto/update-user.dto';
import { ExtendedUserPayload } from '../interfaces/data.interfaces.mock';
import { Schema } from 'mongoose';

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

export const mockUserWishlistAdd: ExtendedUserPayload = {
  _id: '663c6b9431b8a8ca062202d8',
  name: 'User Updated',
  email: 'test@test.com',
  wishlist: [
    {
      price: 12719.9,
      image:
        'http://challenge-api.luizalabs.com/images/1c95d400-9847-eda3-de07-0e62d80a30c6.jpg',
      brand: 'fender',
      id: new Schema.Types.ObjectId('1c95d400-9847-eda3-de07-0e62d80a30c6'),
      title: 'Guitarra Strato Fender Amercian Special HSS',
    },
  ],
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

export const mockProductDetailed = {
  price: 12719.9,
  image:
    'http://challenge-api.luizalabs.com/images/1c95d400-9847-eda3-de07-0e62d80a30c6.jpg',
  brand: 'fender',
  id: '1c95d400-9847-eda3-de07-0e62d80a30c6',
  title: 'Guitarra Strato Fender Amercian Special HSS',
};

export const mockProductsList = {
  meta: {
    page_number: 1,
    page_size: 100,
  },
  products: [
    {
      price: 12719.9,
      image:
        'http://challenge-api.luizalabs.com/images/1c95d400-9847-eda3-de07-0e62d80a30c6.jpg',
      brand: 'fender',
      id: '1c95d400-9847-eda3-de07-0e62d80a30c6',
      title: 'Guitarra Strato Fender Amercian Special HSS',
    },
    {
      price: 82.9,
      image:
        'http://challenge-api.luizalabs.com/images/a0e4aa47-b17c-f266-f4d6-aba26ec085aa.jpg',
      brand: 'epoch magia',
      id: 'a0e4aa47-b17c-f266-f4d6-aba26ec085aa',
      title: 'Bonecos Família dos Cães Sylvanian Families',
    },
    {
      price: 147.19,
      image:
        'http://challenge-api.luizalabs.com/images/f4e98457-f750-d6e4-d274-f3d605ebf590.jpg',
      brand: 'nino',
      id: 'f4e98457-f750-d6e4-d274-f3d605ebf590',
      title: 'Farol Automotivo Lado Esquedo para Corsa 94 a 2000',
    },
    {
      price: 64.9,
      image:
        'http://challenge-api.luizalabs.com/images/dce33cfd-ccb1-c972-da0e-eddefcd1346b.jpg',
      brand: 'arno sorel',
      id: 'dce33cfd-ccb1-c972-da0e-eddefcd1346b',
      title: 'Arno Sorel Solinote Mûre',
    },
    {
      price: 24.9,
      image:
        'http://challenge-api.luizalabs.com/images/ec92cbdd-b7e6-e2c2-a0e8-70ae001cb3d8.jpg',
      brand: 'epoch magia',
      id: 'ec92cbdd-b7e6-e2c2-a0e8-70ae001cb3d8',
      title: 'Sylvanian Families Bebê Ovelha com Triciclo',
    },
    {
      price: 37.9,
      image:
        'http://challenge-api.luizalabs.com/images/d6d9ab20-ef42-bab5-9b6e-6dc90d981472.jpg',
      brand: 'ruvolo',
      id: 'd6d9ab20-ef42-bab5-9b6e-6dc90d981472',
      title: 'Taça para Champanhe/Vinho 1 Peça',
    },
    {
      reviewScore: 4.352941,
      title: 'Churrasqueira Elétrica Mondial 1800W',
      price: 159,
      brand: 'mondial',
      id: '571fa8cc-2ee7-5ab4-b388-06d55fd8ab2f',
      image:
        'http://challenge-api.luizalabs.com/images/571fa8cc-2ee7-5ab4-b388-06d55fd8ab2f.jpg',
    },
    {
      price: 39,
      image:
        'http://challenge-api.luizalabs.com/images/f6c094e1-f27d-677b-4187-cf6a5acd03aa.jpg',
      brand: 'ruvolo',
      id: 'f6c094e1-f27d-677b-4187-cf6a5acd03aa',
      title: 'Taça para Vinho 1 Peça',
    },
    {
      price: 545,
      image:
        'http://challenge-api.luizalabs.com/images/dbaa0b7d-ddab-8bef-4715-bab2c42b5446.jpg',
      brand: 'salvatore ferragamo',
      id: 'dbaa0b7d-ddab-8bef-4715-bab2c42b5446',
      title: 'Salvatore Ferragamo Emozione Perfume Feminino',
    },
    {
      price: 26.63,
      image:
        'http://challenge-api.luizalabs.com/images/2fed4df3-5f11-c6a3-ac69-f9a408f2eff7.jpg',
      brand: 'ruvolo',
      id: '2fed4df3-5f11-c6a3-ac69-f9a408f2eff7',
      title: 'Taça para Cerveja 1 Peça',
    },
    {
      price: 391,
      image:
        'http://challenge-api.luizalabs.com/images/c60ba2af-6b1c-f932-8dd3-42a7d17a54db.jpg',
      brand: 'salvatore ferragamo',
      id: 'c60ba2af-6b1c-f932-8dd3-42a7d17a54db',
      title: 'Salvatore Ferragamo Emozione Perfume Feminino',
    },
    {
      price: 26.63,
      image:
        'http://challenge-api.luizalabs.com/images/7be7243b-e938-fe5d-a71e-905fd7a9fbba.jpg',
      brand: 'ruvolo',
      id: '7be7243b-e938-fe5d-a71e-905fd7a9fbba',
      title: 'Taça para Cerveja 1 Peça',
    },
    {
      price: 33.53,
      image:
        'http://challenge-api.luizalabs.com/images/9175d13b-52c6-f14c-05d1-f70f12e908b5.jpg',
      brand: 'ruvolo',
      id: '9175d13b-52c6-f14c-05d1-f70f12e908b5',
      title: 'Taça para Vinho 1 Peça',
    },
  ],
};
