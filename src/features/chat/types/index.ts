export interface UseReceivedMessageProps {
  roomId: string;
  enabled?: boolean;
}

/*----------------------------------
  Use Send Message Props
----------------------------------*/
export interface UseSendMessageProps {
  roomId: string;
  userId: number;
  clientId: number;
  senderRole?: 'user' | 'client';
}

/*----------------------------------
  Messages
----------------------------------*/
export interface Message {
  id: number;
  roomId: string;
  clientId: number;
  userId: number;
  senderRole: 'client' | 'user';
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

/*----------------------------------
  Chat Types
----------------------------------*/
export type MessageDirection = 'sent' | 'received';

export type ChatItem = {
  id: string;
  type: string;
  message: string;
  time: string;
  direction: MessageDirection;
  fileType?: string;
  preview?: string;
};

export type ChatResponse = {
  id: string;
  clientId: number;
  userId: number;
  senderRole: string;
  message: string;
  messageType: string;
  mimeType: string | null;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

/*----------------------------------
  Chat State
----------------------------------*/
export interface ChatState {
  chat: ChatItem[];
}
