export interface Message {
  id?: string;
  question: string;
  answer?: string;
  userId: string;
  date: Date;
}
