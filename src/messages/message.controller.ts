import { Controller } from '@nestjs/common';
import { MessageService } from './message.service';
import { EventPattern } from '@nestjs/microservices';
import { chatDetails, chatSearchDetails, messageModel } from './types';

@Controller()
export class MessageController {
  constructor(private readonly _messageServices: MessageService) {}

  @EventPattern('create-chat')
  async createChat(data: chatDetails) {
    return await this._messageServices.createChat(data);
  }

  @EventPattern('get-chat')
  async getChat({ userId }) {
    console.log(await this._messageServices.getChat(userId));
  }
  @EventPattern('find-chat')
  async findChat(data: chatSearchDetails) {
    return await this._messageServices.chatFind(data);
  }

  @EventPattern('add-message')
  async addMessage(data: messageModel) {
    console.log('test-2');

    return await this._messageServices.addMessage(data);
  }

  @EventPattern('get-message')
  async getMessage(data: messageModel) {
    return await this._messageServices.getMessages(data);
  }
}
