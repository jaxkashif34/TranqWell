import { BaseUser } from './RolesType';

export type MessageType = {
  id: number;
  sender_details: BaseUser;
  receiver_details: BaseUser;
  content: string;
  timestamp: string;
  conversation_id: number;
};

export type Conversation = {
  id: number;
  receiver_details: BaseUser;
  sender_details: BaseUser;
  last_message: MessageType;
  isPinned: boolean;
  conversation_id: number;
};

export type SocketMessage = {
  message: string;
  conversation_id: number;
  sender: BaseUser;
  receiver: BaseUser;
};
