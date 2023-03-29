/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({
  timestamps: true,
})
export class Chat {
	@Prop({required:true, type: Array })
	members:[]
	@Prop({required:true})
	channelId:string
	

}

export const ChatSchema = SchemaFactory.createForClass(Chat);
