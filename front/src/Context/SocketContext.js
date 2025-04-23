import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
   const [isConnected, setIsConnected] = useState(false); // Pour suivre l'état de la connexion

 useEffect(() => {
  if (!currentUser) return; // Attendre que currentUser soit défini

  // Création de la connexion WebSocket seulement si currentUser est défini
  const newSocket = io("http://localhost:5000", {
    transports: ["websocket"],
    withCredentials: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  });

  newSocket.on("connect", () => {
    setIsConnected(true);
    console.log("Connected to WebSocket");
  });

  newSocket.on("disconnect", () => {
    setIsConnected(false);
    console.log("Disconnected from WebSocket");
  });

  newSocket.on("connect_error", (err) => {
    console.error("WebSocket connection error:", err);
  });

  setSocket(newSocket);

  return () => {
    newSocket.disconnect();
  };
}, [currentUser]);  // Ajouter currentUser comme dépendance


  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};