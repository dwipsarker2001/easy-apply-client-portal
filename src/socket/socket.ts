// src/socket/socket.ts
import { io } from "socket.io-client";

// Replace with your backend URL or use env variable
const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// Get auth token from localStorage
const getAuthToken = () => {
  try {
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      const user = JSON.parse(authUser);
      return user.token || localStorage.getItem("authToken");
    }
    return localStorage.getItem("authToken");
  } catch {
    return null;
  }
};

export const socket = io(SOCKET_URL, {
  autoConnect: false,  
  transports: ["websocket"],    // Connect manually
  withCredentials: true,   // Enable cookies if needed
  // auth: {
  //   token: getAuthToken() || "",
  // },
});
