import { Message } from './Message';

export interface Conversation {
  id: string;
  name: string;
  userId: string;
  startDate: string;
  messages: Array<Message>;
}
