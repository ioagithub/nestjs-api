import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ require: true })
  readonly name: string;
  @Prop({ require: true })
  readonly email: string;
  @Prop({ require: true })
  readonly password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
