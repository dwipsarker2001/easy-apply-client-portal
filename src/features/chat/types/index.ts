/*----------------------------------
  Use received message props
----------------------------------*/
export interface UseReceivedMessageProps {
  roomId: string;
  enabled?: boolean;
}

/*----------------------------------
  Use Send Message Props
----------------------------------*/
export interface UseSendMessageProps {
  roomId: string;
  userId: number | null;
  clientId: number;
  senderRole?: 'user' | 'admin';
}

/*----------------------------------
  Messages
----------------------------------*/
export interface Message {
  id: number;
  roomId: string;
  clientId: number;
  userId: number;
  senderRole: "admin" | "user"; 
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}


/*----------------------------------
  Chat Types
----------------------------------*/
export type MessageDirection = "sent" | "received";

export type ChatTextItem = {
  id: string;
  type: "text";
  content: string;
  direction: MessageDirection;
  time: string,
};

export type ChatFileItem = {
  id: string;
  type: "file";         
  fileType: string;
  name: string;
  preview: string;
  direction: MessageDirection;
  time: string;
};

export type ChatItem = ChatTextItem | ChatFileItem;

/*----------------------------------
  Chat State
----------------------------------*/
export interface ChatState {
  chat: ChatItem[];
}