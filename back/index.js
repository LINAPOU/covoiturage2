import express from "express";
import dotenv from "dotenv"; 
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import trajetRoute from "./routes/trajet.route.js";
import adminRoutes from "./routes/user.route.js";
import contactRoutes from "./routes/contact.route.js";
import chatRoutes from "./routes/chat.route.js";
import driverRoutes from "./routes/driver.route.js";
import notifRoutes from "./routes/notif.route.js"; // Importer le fichier de routes de notification
import reviewRoutes from "./routes/review.route.js"; // Importer le fichier de routes de review
import cookieParser from "cookie-parser"; 
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io"; // Import de socket.io

dotenv.config(); 
import path from "path";
import { fileURLToPath } from "url";

const app = express(); 


// Middleware pour gérer les fichiers multipart/form-data (pour les uploads) EN front c grace a ça que je vais generer la route de l'upload
// Définir __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//  Servir les fichiers statiques dans /uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));





// Configurer le CORS pour autoriser la communication entre le frontend et le backend
//cors permet de gérer les requêtes cross-origin entre le frontend et le backend
app.use(cors({ 
  origin: "http://localhost:3000",  // Adresse du frontend
  credentials: true,
  allowedHeaders: "Content-Type, Authorization",
  methods: "GET,POST,PUT,DELETE",
}));

// Créer un serveur HTTP et l'utiliser pour WebSocket
const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // le frontend React
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use(cookieParser());

// Définir les routes de l'API
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/trajet", trajetRoute);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/notifications", notifRoutes);


// Route test
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Connexion à MongoDB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("✅ Connexion à MongoDB réussie"))
  .catch(error => {
    console.error("❌ Erreur de connexion à MongoDB :", error);
  });

let onlineUser = [];

// Fonction pour ajouter un utilisateur connecté
const addUser = (userId, socketId) => {
  const userExists = onlineUser.find((user) => user.userId === userId);
  if (userExists) {
    // Ajouter un nouveau socketId si l'utilisateur est déjà connecté avec un autre appareil
    userExists.socketIds.push(socketId);
  } else {
    // Créer un nouvel utilisateur avec un tableau de socketIds
    onlineUser.push({ userId, socketIds: [socketId] });
  }
};











// Fonction pour retirer un utilisateur déconnecté
const removeUser = (socketId) => {
  onlineUser = onlineUser
    .map((user) => {
      // Supprimer le socketId de l'utilisateur
      user.socketIds = user.socketIds.filter((id) => id !== socketId);
      return user;
    })
    .filter((user) => user.socketIds.length > 0); // Supprimer l'utilisateur s'il n'a plus de socketId
};





// Fonction pour obtenir un utilisateur par son ID
const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

// Gérer la connexion WebSocket
io.on("connection", (socket) => {
  console.log('User connected:', socket.id);

  // Lorsqu'un nouvel utilisateur se connecte
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log("Users connected:", onlineUser);
  });

  // Lors de l'envoi d'un message
  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver && receiver.socketIds.length > 0) {
      // Envoyer le message à tous les socketId du destinataire
      receiver.socketIds.forEach((socketId) => {
        io.to(socketId).emit("getMessage", data);
      });
    } else {
      console.log(`Receiver ${receiverId} is not online`);
    }
  });

  // Lorsqu'un utilisateur se déconnecte
  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("User disconnected:", socket.id);
  });
});
