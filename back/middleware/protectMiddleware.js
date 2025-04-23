import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const protect = async (req, res, next) => {
    let token;

    // Vérifier si le token est dans les cookies
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ msg: "Non autorisé, token manquant" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId }
        });

        if (!user) {
            return res.status(401).json({ msg: "Utilisateur non trouvé" });
        }

        req.user = {
  id: decoded.userId,
  email: decoded.email,
  username: decoded.username
};
 // on garde la référence utilisateur
        req.userId = user.id; // pour simplifier les accès plus tard
        next();
    } catch (error) {
        console.error("Erreur de vérification du token :", error);
        return res.status(401).json({ msg: "Token invalide" });
    }
};
