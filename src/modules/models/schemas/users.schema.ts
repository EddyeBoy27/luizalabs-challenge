import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ collection: 'users', timestamps: true, versionKey: false })
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  roles: string[];
}
