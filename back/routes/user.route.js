import express from 'express';
import { getUsers, getUser, updateUser, deleteUser,profileTrajets } from "../Controllers/user.controller.js";
import { verifyToken } from '../middleware/verifyToken.js';
import { isAdmin } from "../middleware/authMiddleware.js";
import { protect } from '../middleware/protectMiddleware.js';

const router = express.Router();
router.get("/profileTrajets",verifyToken, profileTrajets);

router.get('/', getUsers);
router.get('/:id', verifyToken, getUser);////////////////
router.post('/update/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

router.get("/admin-only", verifyToken, isAdmin, (req, res) => {
    res.json({ msg: "Bienvenue, admin !" });
});
// GET /auth/user
router.get("/user", verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    res.status(500).json({ msg: "Erreur serveur." });
  }
});




export default router;
