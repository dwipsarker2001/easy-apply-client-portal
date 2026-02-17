import React from 'react';
import { Navigate, useParams } from 'react-router';

import AuthSheet from '../auth/AuthSheet';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import InputArea from './components/InputArea';
import { useReceivedMessage } from './hooks/useReceivedMessage';
import { useUserInfoQuery } from '../auth/api';
import { useLoadMessagesQuery } from './api';

const ROOM_ID = 'client_3';

const ChatPage: React.FC = () => {
  // -------------------------------------
  // Hooks
  // -------------------------------------
  const { username } = useParams<{ username: string }>();
  const { data: user, isError, isLoading } = useUserInfoQuery(username ?? '');
  useReceivedMessage({ roomId: ROOM_ID });

  // Load messages once client exists
  useLoadMessagesQuery({ clientId: 1, userId: 1 });

  // -------------------------------------
  // Redirect if username is missing or user not found
  // -------------------------------------
  if (!username || isError || (!isLoading && !user)) {
    return <Navigate to="/404" replace />;
  }

  // -------------------------------------
  // Render Chat Page
  // -------------------------------------
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
