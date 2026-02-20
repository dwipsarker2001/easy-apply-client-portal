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

const ROOM_ID = 'client_3';

const ChatPage: React.FC = () => {
  const { userInfo, clientId } = useAppSelector(state => state.auth);
  const { username } = useParams<{ username: string }>();

  // -------------------------------------
  // Fetch user info
  // -------------------------------------
  const {
    data: user,
    isError: isUserError,
    isLoading: isUserLoading,
  } = useUserInfoQuery(username ?? '', {
    skip: !username,
  });

  // -------------------------------------
  // Listen for incoming messages
  // -------------------------------------
  useReceivedMessage({ roomId: ROOM_ID });

  // -------------------------------------
  // Load chat messages safely
  // -------------------------------------
  const {
    data: messages,
    isLoading: isMessagesLoading,
    isError: isMessagesError,
  } = useLoadMessagesQuery(
    {
      clientId: clientId!, // non-null assertion
      userId: userInfo.userId!,
    },
    { skip: !clientId || !userInfo.userId }
  );

  // -------------------------------------
  // Redirect if username is invalid or user not found
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
    </div>
  );
};

export default ChatPage;