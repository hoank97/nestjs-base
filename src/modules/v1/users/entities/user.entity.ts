import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  _id: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
