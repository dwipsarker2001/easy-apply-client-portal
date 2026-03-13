import React from 'react';
import { Navigate, useParams } from 'react-router';
import AuthSheet from '../auth/AuthSheet';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import InputArea from './components/InputArea';
import { useReceivedMessage } from './hooks/useReceivedMessage';
import { useUserInfoQuery } from '../auth/api';
import { useLoadMessagesQuery } from './api';
import { useAppSelector } from '@/hooks';
import UIWrapper from '@/components/UIWrapper';
import Preview from './components/Preview';

const ChatPage: React.FC = () => {
  const { userInfo, clientId } = useAppSelector(state => state.auth);
  const { username } = useParams<{ username: string }>();

  // -------------------------------------
  // Fetch user info from username param
  // -------------------------------------
  const {
    data: user,
    isError: isUserError,
    isLoading: isUserLoading,
  } = useUserInfoQuery(username ?? '', { skip: !username });
  useReceivedMessage({ roomId: `room-${clientId}` });

  // -------------------------------------
  // Load chat messages safely
  // -------------------------------------
  const {
    data: messages,
    isLoading: isMessagesLoading,
    isError: isMessagesError,
  } = useLoadMessagesQuery(
    {
      clientId: clientId!, // logged-in client
      userId: user?.userId!, // user from param
    },
    { skip: !clientId || !user?.userId }
  );

  // -------------------------------------
  // Redirect if user invalid
  // -------------------------------------
  if (!username || isUserError || (!isUserLoading && !user)) {
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
      <Preview />
    </div>
  );
};

export default ChatPage;
