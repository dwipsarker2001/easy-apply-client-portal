// src/socket/socket.ts
import { io } from "socket.io-client";

// Replace with your backend URL or use env variable
const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const socket = io(SOCKET_URL, {
  autoConnect: false,  
  transports: ["websocket"],    // Connect manually
  withCredentials: true,   // Enable cookies if needed
});
