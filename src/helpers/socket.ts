import { io } from "socket.io-client";
import { user_token } from "./constant";
import { useProfileStore } from "@/store/profilStore";

const SERVER_URL = "http://localhost:5001";


// 1. Initialisation de l'instance sans connexion automatique
export const socket = io(SERVER_URL, {
  autoConnect: false,
  transports: ["polling", "websocket"]
});

// 2. Fonction à appeler pour rafraîchir le jeton et se connecter
export const connectSocket = () => {
  const token = localStorage.getItem(user_token);
  const authStore = useProfileStore();
  const role = authStore.connectedUser?.role;
  
  if (!token) {
    console.error("Impossible de connecter le socket : aucun jeton trouvé.");
    return;
  }

  if(["admin","CategoryManager"].includes(role)){
  // Injecte dynamiquement le jeton frais dans les options de transport HTTP
  socket.io.opts.extraHeaders = {
    Authorization: `Bearer ${token}`
  };
}

  // Déclenche la poignée de main (handshake)
  socket.connect();
};
