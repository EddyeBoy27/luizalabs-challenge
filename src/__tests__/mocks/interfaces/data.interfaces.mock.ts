import { UserPayload } from '../../../modules/users/models/payload/users.payload';

export interface ExtendedUserPayload extends UserPayload {
  _id: string;
}
