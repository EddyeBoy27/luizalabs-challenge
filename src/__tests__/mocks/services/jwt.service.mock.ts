import { mockUserPayload, mockedJwtToken } from '../data.mock';

export const MockJwtService = {
  sign: jest.fn().mockResolvedValueOnce(mockedJwtToken.access_token),
  verifyAsync: jest.fn().mockResolvedValueOnce(mockUserPayload),
};
