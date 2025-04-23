import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    console.log("🔹 Cookies reçus :", req.cookies);
    console.log("🔹 Headers reçus :", req.headers);

    const token = req.cookies.token 
  console.log("🟢 Token récupéré :", token); // Affiche le token récupéré

    if (!token) {
        return res.status(401).json({ message: "Non authentifié !" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(403).json({ message: "Token invalide !" });
        }

        console.log("🔹 Payload JWT :", payload); 

        req.userId = payload.userId; // Assigner l'ID de l'utilisateur
        if (!req.userId) {
            return res.status(401).json({ message: "ID utilisateur manquant dans le token" });
        }

        next(); // Passe à la prochaine étape
    });
};
