import { addMessage, setMessages } from "@/state";
import { socket } from "./socket";
import { Dispatch } from "redux";

const normalizeMessage = (msg: any): string => {
  if (typeof msg === "string") return msg;
  if (msg?.dataValues?.message) return msg.dataValues.message;
  if (msg?.message) return msg.message;
  return JSON.stringify(msg);
};

export const registerChatListeners = (dispatch: Dispatch) => {
  socket.on("receive_message", (msg) => {
    const content = normalizeMessage(msg);
    if (content) {
      dispatch(addMessage(content));
    }
  });

  socket.on("chat_history", (messages) => {
    if (Array.isArray(messages)) {
      const normalized = messages.map((msg) => ({
        id: (msg?.dataValues?.id || msg?.id)?.toString() || Date.now().toString(),
        type: "text",
        content: normalizeMessage(msg),
        direction: msg?.dataValues?.senderRole === "user" ? "sent" : "received",
      }));
      dispatch(setMessages(normalized));
    }
  });

  socket.on("chat_error", (error) => {
    console.error("Chat error:", error);
  });
};
