import TextMessage from '@/components/TextMessage';
import FileMessage from '@/features/chat/components/FileMessage';
import { useChatAreaController } from '@/features/chat/hooks';
import React from 'react';

const ChatArea: React.FC = () => {
  const {
    chat,
    isLoggedIn,
    isMediaOpen,
    containerRef,
    chatEndRef,
    handleCloseMedia,
  } = useChatAreaController();

  return (
    <main className="relative flex-grow overflow-hidden pb-[80px] bg-[#EFEEF3]">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[url('@/assets/chat-background.svg')] bg-repeat bg-contain bg-center opacity-[0.05] pointer-events-none" />

      {/* Media overlay */}
      {isMediaOpen && (
        <div
          onClick={handleCloseMedia}
          className={`absolute inset-0 ${isLoggedIn ? 'z-30' : 'z-99'} bg-black/20 backdrop-blur-[2px]`}
        />
      )}

      {/* Chat content */}
      <div
        ref={containerRef}
        className="relative z-20 flex flex-col h-full overflow-y-auto px-5 pt-4 gap-2"
      >
        {chat.map(item => {
          switch (item.type) {
            case 'text':
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

            case 'file':
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

            default:
              return null;
          }
        })}

        <div ref={chatEndRef} />
      </div>
    </main>
  );
};

export default ChatArea;
