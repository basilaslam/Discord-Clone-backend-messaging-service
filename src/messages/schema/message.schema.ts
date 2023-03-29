/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema({
  timestamps: true,
})
export class Message {
	@Prop({required:true})
	chatId:string
	@Prop({required:true})
	senderId:string
	@Prop({required:true})
	text:string
}

export const MessageSchema = SchemaFactory.createForClass(Message);
