import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IProduct } from '../../../../modules/products/model/interfaces/product.interface';
import { ROLES } from '../../../../shared/constants';

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

  @Prop({ default: [ROLES.USER] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
