import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const protect = async (req, res, next) => {
    let token;

    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ msg: "Non autorisé, token manquant" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token décodé :", decoded);

        if (!decoded.userId) {
            return res.status(401).json({ msg: "Token invalide (userId manquant)" });
        }

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId }
        });

        if (!user) {
            return res.status(401).json({ msg: "Utilisateur non trouvé" });
        }

        req.user = user;
        req.userId = user.id;
        next();
    } catch (error) {
        console.error("❌ Erreur dans protect middleware :", error.message);
  res.status(500).json({ msg: "Erreur serveur", error: err.message });
    }
};
