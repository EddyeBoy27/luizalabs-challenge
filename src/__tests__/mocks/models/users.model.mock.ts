import { mockUserPayload } from '../data.mock';

export const MockUsersModel = {
  findOne: jest.fn().mockReturnValue({
    select: jest.fn().mockReturnValue({
      exec: jest.fn().mockReturnValue({
        toObject: jest.fn().mockReturnValueOnce(mockUserPayload),
      }),
    }),
  }),
};
