import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { getUsers } from "./user.controller.js";








export const getPendingDrivers = async (req, res) => {
  try {
    const drivers = await prisma.user.findMany({
      where: {
        role: "USER", 
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
    const userId = req.user.id;
    const { identityCard, carRegistration, vehicleCard } = req.files;

    if (!identityCard || !carRegistration || !vehicleCard) {
      return res.status(400).json({ msg: "Tous les documents sont requis." });
    }

    // Mettez ici les chemins des fichiers dans la base de données ou d'autres champs pertinents
    const identityCardPath = identityCard[0].path;
    const carRegistrationPath = carRegistration[0].path;
    const vehicleCardPath = vehicleCard[0].path;

    await prisma.user.update({
      where: { id: userId },
      data: {
        identityCard: identityCardPath,
        carRegistration: carRegistrationPath,
        vehicleCard: vehicleCardPath,
       isDriverValidated: false,
 // En attente de validation
      },
    });

    res.status(200).json({ msg: "Documents envoyés. En attente de validation." });
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur" });
  }
};

export const validateDriver = async (req, res) => {
  const { userId } = req.body;
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        isDriverValidated: true,
        role: "DRIVER", // tu peux lui donner le rôle conducteur ici
      },
    });
    res.status(200).json({ msg: "Conducteur validé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la validation :", error);
    res.status(500).json({ msg: "Erreur serveur lors de la validation." });
  }
};
