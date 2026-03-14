import { useAppDispatch, useAppSelector } from '@/hooks';
import { useCallback, useEffect, useRef } from 'react';
import { setMediaFrom } from '../redux/chatSlice';

export const useChatAreaController = () => {
  const dispatch = useAppDispatch();
  const { chat, mediaFrom } = useAppSelector(state => state.chat);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const containerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleCloseMedia = useCallback(() => {
    dispatch(setMediaFrom(null));
  }, [dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [chat, scrollToBottom]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleLoad = () => {
      scrollToBottom();
    };

    const useCapture = true;
    container.addEventListener('load', handleLoad, useCapture);

    return () => {
      container.removeEventListener('load', handleLoad, useCapture);
    };
  }, [scrollToBottom]);

  return {
    chat,
    isLoggedIn,
    isMediaOpen: Boolean(mediaFrom),
    containerRef,
    chatEndRef,
    handleCloseMedia,
  };
};
