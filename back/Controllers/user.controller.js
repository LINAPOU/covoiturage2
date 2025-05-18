import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";  // Importez ObjectId

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user!" });
  }
};


export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    const { password: userPassword, ...rest } = updatedUser;

    res.status(200).json(rest);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update users!" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const tokenUserId = req.userId; // L'ID du user connecté (extrait du token)

  try {
    // Vérifie si l'utilisateur est admin
    const requestingUser = await prisma.user.findUnique({
      where: { id: tokenUserId },
    });
    console.log("ID du token:", tokenUserId);
console.log("ID admin trouvé en base:", requestingUser.id);



    // Supprime l'utilisateur
    await prisma.user.delete({
      where: { id },
    });

    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    console.error("Erreur suppression utilisateur :", err);
    res.status(500).json({ message: "Échec de la suppression de l'utilisateur" });
  }
};





export const profileTrajets = async (req, res) => {
 const id = req.params.id;
  const tokenUserId = req.userId;

const idFromParams = new ObjectId(id);  // Conversion de l'ID de l'URL en ObjectId


const objectIdFromToken = new ObjectId(tokenUserId);
  try {
    // Trajets que l'utilisateur a créés
    const userTrajets = await prisma.trajet.findMany({
      where: { userId: tokenUserId },
      orderBy: { createdAt: 'desc' }, // Si tu veux trier les plus récents
    });

  


    res.status(200).json({ userTrajets });
  } catch (err) {
    console.error("❌ Erreur lors de la récupération des trajets du profil :", err);
    res.status(500).json({ message: "Échec de récupération des trajets du profil." });
  }
};
