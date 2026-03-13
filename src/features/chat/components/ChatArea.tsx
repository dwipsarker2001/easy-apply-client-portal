import FileMessage from '@/features/chat/components/FileMessage';
import TextMessage from '@/components/TextMessage';
import { useAppDispatch, useAppSelector } from '@/hooks';
import React, { useEffect, useRef } from 'react';
import { setMediaFrom } from '../redux/chatSlice';

const ChatArea: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mediaFrom, chat } = useAppSelector(state => state.chat);
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when chat changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const isMediaOpen = Boolean(mediaFrom);

  return (
    <main className="relative flex-grow overflow-hidden pb-[80px] bg-[#EFEEF3]">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[url('@/assets/chat-background.svg')] bg-repeat bg-contain bg-center opacity-[0.05] pointer-events-none" />

      {/* Media overlay */}
      {isMediaOpen && (
        <div
          onClick={() => dispatch(setMediaFrom(null))}
          className={`absolute inset-0 ${isLoggedIn ? 'z-30' : 'z-99'}  bg-black/20 backdrop-blur-[2px]`}
        />
      )}

      {/* Chat content */}
      <div className="relative z-20 flex flex-col h-full overflow-y-auto px-5 pt-4 gap-2">
        {chat.map(item => {
          if (item.type === 'text') {
            return (
              <TextMessage
                key={item.id}
                message={item.message}
                direction={item.direction}
                time={item.time}
                id={item.id}
                type={item.type}
              />
            );
          }

          if (item.type === 'file') {
            console.log(item);
            return (
              <FileMessage
                key={item.id}
                id={item.id}
                message={item.message}
                fileType={item.fileType}
                time={item.time}
                direction={item.direction}
                preview={item.preview}
                type="file"
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
