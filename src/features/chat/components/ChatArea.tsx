import TextMessage from '@/components/TextMessage';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setMediaFrom } from '@/state';
import { TickDouble01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import React, { useEffect, useRef } from 'react';
import SendInfo from './SendingInfo';

const ChatArea: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mediaFrom, chat } = useAppSelector(state => state.app);

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
            const isImage = item.file.type.startsWith('image/');
            const fileURL = URL.createObjectURL(item.file);

            return (
              <div key={item.id} className="self-end max-w-[240px] relative">
                {isImage ? (
                  <img
                    src={fileURL}
                    alt={item.file.name}
                    className="rounded-xl shadow-md max-w-40"
                    onLoad={() => URL.revokeObjectURL(fileURL)}
                  />
                ) : (
                  <a
                    href={fileURL}
                    download={item.file.name}
                    className="block bg-white p-3 text-blue-600 text-sm truncate"
                    onClick={() => URL.revokeObjectURL(fileURL)}
                  >
                    📄 {item.file.name}
                  </a>
                )}
                {/* Sending Info */}
                <SendInfo />
              </div>
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
