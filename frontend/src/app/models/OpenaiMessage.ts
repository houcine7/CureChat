export interface OpenaiMessage {
  role: MessageRole;
  content: string;
}

export enum MessageRole {
  'system',
  'user',
  'assistant',
}
