import { io } from "socket.io-client";
import { user_token } from "./constant";

const SERVER_URL = "http://localhost:5001"; 

const socket = io(SERVER_URL, {
  autoConnect: false,
  transports: ["websocket", "polling"],
  auth: (cb) => {
    const token = localStorage.getItem(user_token); 
    cb({
      token: token ? `Bearer ${token}` : null
    });
  }
});

export default socket;
