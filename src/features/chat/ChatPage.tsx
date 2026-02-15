import React from 'react';
import AuthSheet from '../auth/AuthSheet';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import InputArea from './components/InputArea';
import { useReceivedMessage } from './hooks/useReceivedMessage';
import { Navigate, useParams } from 'react-router';
import { useUserInfoQuery } from '../auth/api';
import { useLoadMessagesQuery } from './api';

const ROOM_ID = 'client_3';
const ChatPage: React.FC = () => {
  useReceivedMessage({ roomId: ROOM_ID });
  
  // get username
  const { username } = useParams<{ username: string }>();
  if (!username) return <Navigate to="/404" replace />;
  
  // Fetch owner info
  useUserInfoQuery(username);
  useLoadMessagesQuery({clientId: 1, userId: 1})

  return (
    <div className="h-[100dvh] w-screen flex flex-col relative overflow-hidden">
      <Header />
      <ChatArea />
      <InputArea />
      <AuthSheet /> 
    </div>
  );
};

export default ChatPage;
