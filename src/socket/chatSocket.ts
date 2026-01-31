import { socket } from "./socket";

export const joinRoom = (roomId: string) => {
  socket.emit("join_room", { roomId });
};

export const sendChatMessage = (payload: {
  roomId: string;
  clientId: number;
  userId: string;
  senderRole: "client" | "user";
  message: string;
  type?: "text" | "file";
  fileUrl?: string;
}) => {
  socket.emit("send_message", payload);
};