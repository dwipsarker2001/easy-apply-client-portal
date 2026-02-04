import { useEffect } from 'react';
import { useSocket } from './useSocket';
import { useAppDispatch } from '@/hooks';
import { addMessage } from '@/state';
import { UseReceivedMessageProps } from '../types';
import { ChatTextItem } from '@/types';

// -------------------------------------
//       Received Message Hook
// --------------------------------------
export const useReceivedMessage = ({
  roomId,
  enabled = true,
}: UseReceivedMessageProps) => {
  const socket = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket || !enabled) return;
    socket.emit('join_room', { roomId });

    // handle received message
    const handleReceiveMessage = (data: { message: string }) => {
      // print for debug
      // console.log(data);

      const message: ChatTextItem = {
        id: Date.now().toString(),
        type: 'text',
        content: data.message,
        direction: 'received',
      };
      dispatch(addMessage(message));
    };

    // received message event
    socket.on('receive_message', handleReceiveMessage);

    // remove event listener
    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [socket, roomId, enabled, dispatch]);

  return { socket };
};
