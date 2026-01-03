import React, { useEffect, useRef } from "react";
import TextMessage from "@/components/TextMessage";
import { setMediaFrom } from "@/features/state";
import { useAppDispatch, useAppSelector } from "@/hooks";

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
    <main className="bg-[#EFEEF3] flex-grow relative overflow-hidden pb-[80px]">
      {/* Media overlay */}
      {isMediaOpen && (
        <div
          onClick={() => dispatch(setMediaFrom(null))}
          className="absolute top-0 z-1 h-full w-full bg-black/20 backdrop-blur-[2px]"
        />
      )}

      <div className="flex flex-col h-full overflow-y-auto px-5">
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
