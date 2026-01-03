import { useAppDispatch } from "@/hooks";
import React, { useEffect } from "react";
import BottomSheet from "./components/BottomSheet";
import Header from "./components/Header";
import ChatArea from "./components/ChatArea";
import InputArea from "./components/InputArea";

const ChatPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Prevent viewport resize on keyboard open (iOS fix)
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, interactive-widget=resizes-content"
      );
    }
  }, []);

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
