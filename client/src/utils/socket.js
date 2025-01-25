import { io } from "socket.io-client";

// Replace this URL with your backend WebSocket server URL
const SOCKET_URL = import.meta.env.VITE_BASE_URL;

// Initialize the socket connection
const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: false,
});

// Export the socket instance
export default socket;
