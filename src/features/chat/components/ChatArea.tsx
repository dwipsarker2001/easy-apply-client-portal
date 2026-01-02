import TextMessage from "@/components/TextMessage";
import { setMediaFrom } from "@/features/state";
import { useAppDispatch, useAppSelector } from "@/hooks";
import React from "react";

const ChatArea: React.FC = () => {
  const dispatch = useAppDispatch();
  const mediaFrom = useAppSelector((state) => state.app.mediaFrom);

  return (
    <main className=" bg-red-400 h-[500px] flex-grow relative">
      {/* Blur background when media sheet is open */}
      <div
        onClick={() => dispatch(setMediaFrom(null))}
        className={`h-full w-full bg-black/20 backdrop-blur-[2px] absolute top-0 ${!mediaFrom ? "hidden" : ""}`}
      ></div>

      <div className="flex flex-col border h-full pb-[100px] overflow-y-scroll px-5 ">
        <TextMessage message="Message One" />
        {Array(40)
          .fill(null)
          .map((_, index) => (
            <TextMessage message="Message One" type="sent" />
          ))}
      </div>
    </main>
  );
};

export default ChatArea;
