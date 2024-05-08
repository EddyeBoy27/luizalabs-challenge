// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';
import { ObjectId } from 'mongoose';

declare module 'express' {
  interface Request {
    user: {
      userId: ObjectId;
      name: string;
      email: string;
      roles: string[];
    };
  }
}
