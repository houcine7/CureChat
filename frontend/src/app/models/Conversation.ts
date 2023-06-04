import { Message } from './Message';

export interface Conversation {
  id: string;
  name: string;
  userId: string;
  startDate: Date;
  messages: Array<Message>;
}
