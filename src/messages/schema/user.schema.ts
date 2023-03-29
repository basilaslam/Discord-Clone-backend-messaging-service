/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  username: string;
  
  @Prop({ required: true })
  email: string;

  @Prop()
  mobile: number;

  @Prop({ default: '' })
  image: string;

  @Prop({ default: '' })
  resume: string;

  @Prop({ required: true })
  password: string;


  @Prop()
  DOB: string;

  @Prop()
  gender: string;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  country: string;

  @Prop()
  postalCode: string;

  @Prop()
  qualifications: Array<string>;

  @Prop()
  skills: Array<string>;
}

export const UserSchema = SchemaFactory.createForClass(User);
