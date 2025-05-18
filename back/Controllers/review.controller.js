import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// POST /api/reviews
export const createReview = async (req, res) => {
  const userId = req.userId;
  const { comment, rating } = req.body;

  if (!userId) {
    return res.status(401).json({ msg: "Utilisateur non authentifié" });
  }

  try {
    const review = await prisma.review.create({
      data: {
        comment,
        rating,
        user: {
          connect: { id: userId },
        },
      },
    });

    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur lors de la création de l'avis" });
  }
};


// GET /api/reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: true,
      },
      orderBy: { createdAt: "desc" }
    });

    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur lors de la récupération" });
  }
};
