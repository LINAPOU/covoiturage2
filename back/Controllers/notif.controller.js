import { ObjectId } from 'mongodb';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// GET /notifications
export const getNotifications = async (req, res) => {
  const userId = req.userId;  // L'ID de l'utilisateur connecté (extrait du token)

  try {
    // Récupérer les notifications non lues de l'utilisateur, triées par date (les plus récentes d'abord)
    const notifications = await prisma.notification.findMany({
      where: { userId, read: false },  // Filtrer les notifications non lues
      orderBy: { createdAt: 'desc' },  // Trier par date de création, de la plus récente à la plus ancienne
    });

    // Retourner les notifications
    res.status(200).json(notifications);
  } catch (err) {
    console.error("Erreur lors de la récupération des notifications :", err);
    res.status(500).json({ message: "Erreur lors de la récupération des notifications" });
  }
};
