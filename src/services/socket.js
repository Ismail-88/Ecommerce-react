import { io } from "socket.io-client";
import { API_BASE_URL } from "../context/DataContext";

export const socket = io(API_BASE_URL, {
  autoConnect: false,
  transports: ["websocket", "polling"],
});

export const joinOrderRoom = (orderId) => {
  if (!socket.connected) socket.connect();
  if (orderId) socket.emit("join-order", orderId);
};
