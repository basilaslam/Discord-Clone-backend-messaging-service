import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ChatDocument } from './schema/chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import {
  chatDetails,
  chatSearchDetails,
  messageModel,
  returnMessage,
} from './types';
import { MessageDocument } from './schema/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Chat') private _ChatModel: Model<ChatDocument>,
    @InjectModel('Message') private _MessageModel: Model<MessageDocument>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async createChat(data: chatDetails): Promise<any> {
    console.log(data);

    const { senderId, receiverId, channelId } = data;
    console.log(receiverId, senderId);

    const chat = await this._ChatModel.findOne({
      members: [receiverId, senderId],
    });
    if (!chat) {
      const newChat = new this._ChatModel({
        channelId,
        members: [senderId, receiverId],
      });

      try {
        const result = await newChat.save();
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    } else {
      return false;
    }

    return true;
  }

  async getChat(userId: string): Promise<returnMessage> {
    console.log(userId);

    try {
      const chat = await this._ChatModel.find({
        members: { $in: [userId] },
      });
      return { status: 200, data: chat };
    } catch (error) {
      console.log(error);
    }
  }

  async chatFind(data: chatSearchDetails): Promise<returnMessage> {
    try {
      const { firstId, secondId } = data;

      const chat = await this._ChatModel.findOne({
        members: { $all: [firstId, secondId] },
      });
      return { status: 200, data: chat };
    } catch (error) {
      console.log(error);
    }
  }

  async addMessage(data: messageModel): Promise<returnMessage> {
    console.log('test-3');

    const { chatId, senderId, text } = data;

    const message = new this._MessageModel({
      chatId,
      senderId,
      text,
    });

    try {
      const result = await message.save();
      return { status: 200, data: result };
    } catch (error) {
      console.log(error);
    }
  }

  async getMessages({ chatId }): Promise<returnMessage> {
    try {
      const result = await this._MessageModel
        .find({ senderId: { $ne: null }, chatId })
        .populate({
          path: 'senderId',
          model: 'User',
          select: 'username email',
        });
      return { status: 200, data: result };
    } catch (error) {
      console.log(error);
    }
  }
}
