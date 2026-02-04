import FileMessage from '@/features/chat/components/FileMessage';
import TextMessage from '@/components/TextMessage';
import { useAppDispatch, useAppSelector } from '@/hooks';
import React, { useEffect, useRef } from 'react';
import SendInfo from './SendingInfo';
import { socket } from '@/socket/socket';
import { registerChatListeners } from '@/socket/listeners';
import { setMediaFrom } from '@/state';

const ChatArea: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mediaFrom, chat } = useAppSelector(state => state.app);
  const { clientId } = useAppSelector(state => state.client);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when chat changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const isMediaOpen = Boolean(mediaFrom);

  // Initialize socket connection and listeners
  useEffect(() => {
    // Connect socket
    socket.connect();

    // Register chat listeners
    registerChatListeners(dispatch);

    // Join room and load messages
    if (clientId) {
      const roomId = `client_${clientId}`;
      socket.emit('join_room', { roomId });
      socket.emit('load_messages', { roomId });
    }

    // Connection logs
    socket.on('connect', () => {
      console.log(' Connected!', socket.id);
    });

    socket.on('connect_error', err => {
      console.error('❌ Connect error:', err);
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.disconnect();
    };
  }, [dispatch, clientId]);

  return (
    <main className="relative flex-grow overflow-hidden pb-[80px] bg-[#EFEEF3]">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[url('@/assets/chat-background.svg')] bg-repeat bg-contain bg-center opacity-[0.05] pointer-events-none" />

      {/* Media overlay */}
      {isMediaOpen && (
        <div
          onClick={() => dispatch(setMediaFrom(null))}
          className="absolute inset-0 z-10 bg-black/20 backdrop-blur-[2px]"
        />
      )}

      {/* Chat content */}
      <div className="relative z-20 flex flex-col h-full overflow-y-auto px-5 pt-4 gap-3">
        {chat.map(item => {
          if (item.type === 'text') {
            return (
              <TextMessage
                key={item.id}
                message={item.content}
                direction={item.direction}
              />
            );
          }

          if (item.type === 'file') {
            return (
              <FileMessage
                key={item.id}
                file={item.file}
                direction={item.direction}
              />
            );
          }

          return null;
        })}

        <div ref={chatEndRef} />
      </div>
    </main>
  );
};

export default ChatArea;
