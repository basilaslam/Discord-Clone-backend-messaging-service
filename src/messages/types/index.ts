export interface chatDetails {
  senderId: string;
  receiverId: string;
  channelId: string;
}
export interface chatSearchDetails {
  firstId: string;
  secondId: string;
}
export interface messageModel {
  chatId: string;
  senderId: string;
  text: string;
}
export interface returnMessage {
  status: number;
  data: any;
}
