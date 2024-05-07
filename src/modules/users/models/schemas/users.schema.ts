import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IProduct } from 'src/modules/products/model/interfaces/product.interface';

@Schema({ collection: 'users', timestamps: true, versionKey: false })
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop()
  wishlist: IProduct[];

  @Prop()
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
