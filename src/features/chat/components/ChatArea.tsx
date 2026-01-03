import React, { useEffect, useRef } from "react";
import TextMessage from "@/components/TextMessage";
import { setMediaFrom } from "@/features/state";
import { useAppDispatch, useAppSelector } from "@/hooks";
import chatBackground from "@/assets/chat-background.svg";

const ChatArea: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mediaFrom } = useAppSelector((state) => state.app);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on mount
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

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
      <div className="relative flex flex-col h-full overflow-y-auto px-5">
        <TextMessage message="Message One" />

        {Array.from({ length: 40 }).map((_, index) => (
          <TextMessage key={index} message="Message One" type="sent" />
        ))}

        <div ref={chatEndRef} />
      </div>
    </main>
  );
};

export default ChatArea;
