import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Connect to socket server (without auth for testing)
    socketRef.current = io('http://localhost:8080', {
      withCredentials: true,
      // TODO: Add auth token when ready
      // auth: {
      //   token: localStorage.getItem('authToken') || '',
      // },
    });

    socketRef.current.on('connect', () => {
      console.log('Socket connected:', socketRef.current?.id);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return socketRef.current;
};