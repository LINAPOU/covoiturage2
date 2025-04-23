import prisma from "../lib/prisma.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb"; 
dotenv.config();

// Fonction sendMessage
export const sendMessagetoadmin = async (req, res) => {
  console.log("Requête reçue :", req.body);
  console.log("User ID extrait du token :", req.userId);

  const tokenUserId = req.userId;
  const { message } = req.body;

  if (!tokenUserId) {
    return res.status(401).json({ message: "User ID is missing from token" });
  }

  if (!message) {
    return res.status(400).json({ msg: "Le message est requis" });
  }

  try {
    console.log("🔹 Données reçues :", req.body);
    console.log("🔹 User ID extrait du token :", tokenUserId);
    
     // Récupérer l'utilisateur à partir de la base de données pour obtenir le username
    const user = await prisma.user.findUnique({
      where: { id: tokenUserId },
      select: { username: true }, // Sélectionner seulement le username
    });


    // Création du message
    const newMessage = await prisma.message.create({
      data: {
        message,
        userId: tokenUserId,  // Utilise l'ID de l'utilisateur connecté
         username: user.username,
      },
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("❌ Erreur Prisma :", error);
    res.status(500).json({ msg: "Erreur serveur, réessayez plus tard." });
  }
};

export const sendMessagetodriver = async (req, res) => {
    const tokenUserId = req.userId; // ID de l'utilisateur actuel
  const chatId = req.params.chatId; // ID du chat
  const message = req.body.message; // Le message envoyé par l'utilisateur

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message invalide ou manquant." });
  }

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    if (!chat) return res.status(404).json({ message: "Chat not found!" });

    // Créer le message
    const newMessage = await prisma.message.create({
      data: {
        message,   // Contenu du message
        chatId,    // ID du chat
        userId: tokenUserId,  // ID de l'utilisateur
      },
    });

    // Mettre à jour le chat avec le dernier message (en utilisant son ID)
    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
          lastMessage: newMessage.id,  // Met à jour lastMessage avec l'ID du dernier message

        seenBy: { push: tokenUserId },  // Ajouter l'utilisateur à la liste des utilisateurs ayant vu le message

      },
    });

    res.status(200).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add message!" });
  }
};





export const getMessages = async (req, res) => {
  try {
    const admin = await prisma.user.findUnique({ where: { id: req.userId } });

    if (!admin || admin.role !== "ADMIN") {
      return res.status(403).json({ msg: "Accès refusé" });
    }

    const messages = await prisma.message.findMany({
      include: {
        user: {
          select: { email: true, username: true }, // Récupère l'email et le username de l'utilisateur
        },
      },
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Erreur récupération messages :", error);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};
