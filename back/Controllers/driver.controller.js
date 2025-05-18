import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { getUsers } from "./user.controller.js";








export const getPendingDrivers = async (req, res) => {
  try {
    const drivers = await prisma.user.findMany({
      where: {
        role: "DRIVER", // ✅ Ils ont fait une demande
        // ✅ Ils ne sont pas encore validés
        isDriverValidated: false,
        identityCard: { not: null },
        carRegistration: { not: null },
        vehicleCard: { not: null },
      },
      select: {
        id: true,
        username: true,
        email: true,
         identityCard: true,
        carRegistration: true,
        vehicleCard: true,
      },
    });

    res.status(200).json(drivers);
  } catch (err) {
    console.error("Erreur pending drivers :", err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};



export const uploadDocuments = async (req, res) => {
  try {
    const tokenUserId = req.userId;
    const { identityCard, carRegistration, vehicleCard } = req.files;

    if (!identityCard || !carRegistration || !vehicleCard) {
      return res.status(400).json({ msg: "Tous les documents sont requis." });
    }

    console.log("Enregistrement documents :", {
      identityCard: identityCard[0].path,
      carRegistration: carRegistration[0].path,
      vehicleCard: vehicleCard[0].path,
    });

    const identityCardPath = identityCard[0].path;
    const carRegistrationPath = carRegistration[0].path;
    const vehicleCardPath = vehicleCard[0].path;

    const updatedUser = await prisma.user.update({
      where: { id: tokenUserId },
      data: {
        isDriverValidated: false,
        role: "DRIVER",
        identityCard: identityCardPath,
        carRegistration: carRegistrationPath,
        vehicleCard: vehicleCardPath,
      },
    });

    res.status(200).json({
      msg: "Documents envoyés. En attente de validation.",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Erreur uploadDocuments :", err);
    res.status(500).json({ msg: "Erreur serveur", error: err.message });
  }
};

export const validateDriver = async (req, res) => {
  const { userId } = req.body;
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        isDriverValidated: true,
       
      },
    });
    res.status(200).json({ msg: "Conducteur validé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la validation :", error);
    res.status(500).json({ msg: "Erreur serveur lors de la validation." });
  }
};


export const checkvalidation = async (req, res) => {
  const tokenUserId = req.userId; // ID de l'utilisateur actuel

  try {
    const user = await prisma.user.findUnique({
      where: { id: tokenUserId },
      select: {
        isDriverValidated: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Erreur lors de la vérification :", error);
    res.status(500).json({ msg: "Erreur serveur lors de la vérification." });
  }
}
