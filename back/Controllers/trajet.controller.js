import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";  // Importez ObjectId




// 1️⃣ Récupérer tous les trajets
export const getTrajets = async (req, res) => {
  try {
    let trajets = await prisma.trajet.findMany();

    // 🔹 Assurer que departingDate est bien un Date avant de l'envoyer
    trajets = trajets.map(trajet => ({
      ...trajet,
      departingDate: trajet.departingDate instanceof Date ? trajet.departingDate : new Date(trajet.departingDate)
    }));

    res.status(200).json(trajets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get trajets" });
  }
};

// 2️⃣ Récupérer un trajet spécifique
export const getTrajet = async (req, res) => {
  const id = req.params.id;
  try {
    let trajet = await prisma.trajet.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    if (!trajet) {
      return res.status(404).json({ message: "Trajet not found" });
    }

    // 🔹 Assurer que departingDate est bien un Date
    trajet.departingDate = trajet.departingDate instanceof Date ? trajet.departingDate : new Date(trajet.departingDate);

    res.status(200).json(trajet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get trajet" });
  }
};

// 3️⃣ Ajouter un trajet
export const AddTrajet = async (req, res) => {
  console.log("Requête reçue :", req.body);
  console.log("User ID extrait du token :", req.userId);

  const tokenUserId = req.userId;
  const body = req.body;

  if (!tokenUserId) {
    return res.status(401).json({ message: "User ID is missing from token" });
  }

  try {
    console.log("🔹 Données reçues :", body);
    console.log("🔹 User ID extrait du token :", tokenUserId);

    // 🔹 Conversion de departingDate en Date
    if (body.trajetData?.departingDate) {
      body.trajetData.departingDate = new Date(body.trajetData.departingDate);
    }

    const newTrajet = await prisma.trajet.create({
      data: {
        ...body.trajetData,
        user: {
          connect: { id: tokenUserId },
        },
        trajetDetail: {
          create: body.trajetDetail,
        },
      },
    });

    res.status(201).json(newTrajet);
  } catch (err) {
    console.error("❌ Erreur Prisma :", err);
    res.status(500).json({ message: "Failed to create trajet", error: err.message });
  }
};

// 4️⃣ Modifier un trajet
export const updateTrajet = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const body = req.body;

  try {
    const trajet = await prisma.trajet.findUnique({
      where: { id },
    });

    if (!trajet) {
      return res.status(404).json({ message: "Trajet not found" });
    }

    if (trajet.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    // 🔹 Conversion de departingDate en Date
    if (body.departingDate) {
      body.departingDate = new Date(body.departingDate);
    }

    const updatedTrajet = await prisma.trajet.update({
      where: { id },
      data: {
        ...body,
        updatedAt: new Date(),
      },
    });

    res.status(200).json(updatedTrajet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update trajet" });
  }
};

// 5️⃣ Supprimer un trajet
export const deleteTrajet = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const trajet = await prisma.trajet.findUnique({
      where: { id },
    });

    if (!trajet) {
      return res.status(404).json({ message: "Trajet not found" });
    }

    if (trajet.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

   // exemple avec Prisma
await prisma.trajetDetail.deleteMany({
  where: {
    trajetId: req.params.id,
  },
});

await prisma.trajet.delete({
  where: {
    id: req.params.id,
  },
});


    res.status(200).json({ message: "Trajet deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete trajet" });
  }
};


