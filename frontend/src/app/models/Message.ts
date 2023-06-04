export interface Message {
  id: string;
  question: string;
  answer: string;
  conversationId: string;
  userId: string;
  date: Date;
}
