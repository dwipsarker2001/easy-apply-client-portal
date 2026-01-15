import React from "react";
import BottomSheet from "./components/BottomSheet";
import Header from "./components/Header";
import ChatArea from "./components/ChatArea";
import InputArea from "./components/InputArea";
const ChatPage: React.FC = () => {
  return (
    <div className="h-[100dvh] w-screen flex flex-col relative overflow-hidden">
      <Header />
      <ChatArea />
      <InputArea />
      <BottomSheet />
    </div>
  );
};

export default ChatPage;
