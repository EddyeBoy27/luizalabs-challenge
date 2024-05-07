import { IProduct } from './product.interface';

interface Meta {
  page_number: number;
  page_size: number;
}

export interface IProducts {
  meta: Meta;
  products: IProduct[];
}
