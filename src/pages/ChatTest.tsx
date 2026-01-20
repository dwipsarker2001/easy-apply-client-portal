import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;

const ChatTest: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [roomId, setRoomId] = useState("easyapply_4_2");
  const [clientId, setClientId] = useState(4);
  const [userId, setUserId] = useState(2);
  const [senderRole, setSenderRole] = useState<"client" | "user">("client");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    socket = io("http://localhost:8080", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
      setConnected(true);

      socket.emit("join_room", { roomId });
      socket.emit("load_messages", { roomId });
    });

    socket.on("chat_history", (data) => {
      setMessages(data);
    });

    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send_message", {
      roomId,
      clientId,
      userId,
      senderRole,
      message,
    });

    setMessage("");
  };

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h2>🧪 Chat Test</h2>

      <p>Status: {connected ? "🟢 Connected" : "🔴 Disconnected"}</p>

      <div style={{ marginBottom: 10 }}>
        <label>Room ID:</label>
        <input
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <input
          type="number"
          value={clientId}
          onChange={(e) => setClientId(Number(e.target.value))}
          placeholder="Client ID"
        />
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          placeholder="User ID"
        />
        <select
          value={senderRole}
          onChange={(e) => setSenderRole(e.target.value as any)}
        >
          <option value="client">Client</option>
          <option value="user">User</option>
        </select>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          height: 250,
          overflowY: "auto",
          marginTop: 10,
        }}
      >
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.senderRole}:</b> {m.message}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flex: 1 }}
          placeholder="Type message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatTest;
