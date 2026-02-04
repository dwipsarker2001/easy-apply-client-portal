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
  userId: string;
  clientId: number;
  senderRole?: 'user' | 'admin';
}
