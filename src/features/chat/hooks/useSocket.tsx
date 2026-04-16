import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from '@/hooks';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const token = useAppSelector(state => state.auth.clientToken);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (!token) return;

    // connection setup
    const newSocket = io(BASE_URL, {
      withCredentials: true,
      auth: { token: token },
    });

    // connection event
    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
    });

    // disconnect event
    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  return socket;
};
