import { useEffect } from 'react';
import { useSocket } from './useSocket';
import { useAppDispatch } from '@/hooks';
import { UseReceivedMessageProps } from '../types';
import { ChatTextItem } from '@/types';
import { addMessage } from '../redux/chatSlice';

/*------------------------------------------------------------
 |                   Received Message Hook
 |------------------------------------------------------------
 | Responsibilities:
 | 1. Listen for incoming socket messages
 | 2. Dispatch messages into Redux store
 | 3. Join a room safely (once per room)
 | 4. Prevent duplicate listeners (StrictMode safe)
 |------------------------------------------------------------*/
export const useReceivedMessage = ({
  roomId,
  enabled = true,
}: UseReceivedMessageProps) => {
  const socket = useSocket();
  const dispatch = useAppDispatch();

  /*------------------------------------------------------------
   |          Setup Listener + Join Room (Combined)
   |------------------------------------------------------------
   | Order matters:
   | 1. Attach listener first
   | 2. Then join room
   | This ensures we never miss messages
   *------------------------------------------------------------*/
  useEffect(() => {
    if (!socket || !enabled) return;

    const handleReceiveMessage = (data: { message: string }) => {
      const message: ChatTextItem = {
        id: crypto.randomUUID(),
        type: 'text',
        content: data.message,
        direction: 'received',
      };

      dispatch(addMessage(message));
    };

    // 1. Setup listener first
    socket.off('receive_message', handleReceiveMessage);
    socket.on('receive_message', handleReceiveMessage);

    // 2. Join room after listener is ready
    socket.emit('join_room', { roomId });

    // Cleanup
    return () => {
      socket.off('receive_message', handleReceiveMessage);
      // Optional: leave room on unmount
      // socket.emit('leave_room', { roomId });
    };
  }, [socket, dispatch, roomId, enabled]);

  return { socket };
};
