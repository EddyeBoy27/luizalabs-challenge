import { mockUserPayload, mockedJwtToken } from '../data/data.mock';

export const MockJwtService = {
  sign: jest.fn().mockResolvedValueOnce(mockedJwtToken.access_token),
  verifyAsync: jest.fn().mockResolvedValueOnce(mockUserPayload),
};
