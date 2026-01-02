import { useAppDispatch } from "@/hooks";
import React from "react";
import BottomSheet from "./components/BottomSheet";
import Header from "./components/Header";
import ChatArea from "./components/ChatArea";
import InputArea from "./components/InputArea";

const ChatPage: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="h-screen w-screen flex flex-col relative">
      <Header />
      <ChatArea />
      <InputArea />
      <BottomSheet />
    </div>
  );
};

export default ChatPage;
