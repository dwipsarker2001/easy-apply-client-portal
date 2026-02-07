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