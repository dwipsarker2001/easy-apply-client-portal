import { useAppDispatch, useAppSelector } from '@/hooks';
import { setLoginSheet } from '@/state';
import React, { useEffect } from 'react';
import BottomSheet from './components/BottomSheet';
import ChatArea from './components/ChatArea';
import Header from './components/Header';
import InputArea from './components/InputArea';

const ChatPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn);
  useEffect(() => {
    // Show login sheet if user is not logged in
    if (!isLoggedIn) {
      dispatch(setLoginSheet(true));
    }
  }, [isLoggedIn, dispatch]);
  return (
    <div className="h-[100dvh] w-screen flex flex-col relative overflow-hidden">
      <Header />
      <ChatArea />
      <InputArea />
      <BottomSheet />
    </div>
  );
};

export default ChatPage;
