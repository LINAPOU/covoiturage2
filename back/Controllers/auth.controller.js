import { generateToken } from '../lib/generatetoken.js';
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";



// le controle de creation d'un utilisateur
export const signup = async (req, res) => {
    const { username, email, password } = req.body; 

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ msg: "Vous devez remplir tous les champs" });
        }
        if (password.length < 6) {
            return res.status(400).json({ msg: "Le mot de passe doit contenir au moins 6 caractères" });
        }

        // Vérifier si l'utilisateur existe déjà avec cet email ou ce nom
        const existingUser = await prisma.user.findFirst({
            where: { OR: [{ email }, { username }] } // Vérifie email et name
        });

        if (existingUser) {
            return res.status(400).json({ msg: "L'email ou le nom existe déjà." });
        }

        // Hasher le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Créer un nouvel utilisateur
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        generateToken(newUser.id, res);

        return res.status(201).json({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        });

    }  catch (error) {
    console.error("Erreur serveur :", error);
    return res.status(500).json({ msg: "Erreur serveur, réessayez plus tard." });
}
};














// le controle de connexion
export const login =async (req, res) => { 
   //l'utilisateur saisa son email et son mot de passe
const { email, password } = req.body;

try {
    //verifier si l'utilisateur existe
     const user = await prisma.user.findUnique({
            where: { email }
        });
    
    
    if(!user) {
           return res.status(400).json({
                msg: "l'utilisateur n'existe pas"
            });
        }
    //verifier si le mot de passe est correct (comparer le mot de passe saisi avec celui de la base de données)
    const  mpdcorrecte = await bcrypt.compare(password, user.password);
        if(!mpdcorrecte) {
            return res.status(400).json({
                msg: "mot de passe incorrect"
            })
        }
    
    //generer un jwt token ici et pour eviter de taper ici je vais generer la fonction dans un  autre fichier 
    generateToken(user.id, res);
    console.log("🔹 Token envoyé :", req.cookies.token); // 🔥 Vérifie si le token est bien créé

     return res.status(200).json({
        _id: user.id,
        username: user.username,
         email: user.email,
         role: user.role,
    });
    
    
} catch (error) {

     return res.status(500).json({
        msg: error.message
    });
    
}};










// Déconnexion
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
