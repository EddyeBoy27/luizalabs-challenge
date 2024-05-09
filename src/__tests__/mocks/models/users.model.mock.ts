import {
  mockUpdatedUserPayload,
  mockUserPayload,
  mockUserWishlistAdd,
} from '../data/data.mock';

export class MockUsersModel {
  // constructor(private data: any) {}
  static findOne() {
    return {
      select: () => ({
        exec: () => ({
          toObject: () => mockUserPayload,
        }),
      }),
    };
  }

  static create(bodyData: any) {
    return {
      toObject: () => ({
        _id: '663c6a246813f0c3b6a4d282',
        ...mockUserPayload,
        ...bodyData,
      }),
    };
  }

  static find() {
    return [mockUserPayload];
  }

  static findOneAndUpdate() {
    return {
      exec: () => mockUpdatedUserPayload,
    };
  }

  static findByIdAndUpdate() {
    return {
      exec: () => mockUserWishlistAdd,
    };
  }

  static findByIdAndDelete() {
    return {
      exec: () => {},
    };
  }
}
