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
