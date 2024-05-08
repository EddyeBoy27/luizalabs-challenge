import { ObjectId } from 'mongoose';

export interface IProduct {
  price: number;
  image: string;
  brand: string;
  id: ObjectId;
  title: string;
  reviewScore?: string;
}
