import React from 'react';
import BottomSheet from './components/BottomSheet';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import { useReceivedMessage } from './hooks/useReceivedMessage';
import InputArea from './components/InputArea';

const ROOM_ID = 'client_3';
const ChatPage: React.FC = () => {
  useReceivedMessage({ roomId: ROOM_ID });

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
