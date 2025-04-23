import express from 'express';
import { getUsers, getUser, updateUser, deleteUser,profileTrajets } from "../Controllers/user.controller.js";
import { verifyToken } from '../middleware/verifyToken.js';
import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/profileTrajets",verifyToken, profileTrajets);

router.get('/', getUsers);
router.get('/:id', verifyToken, getUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

router.get("/admin-only", verifyToken, isAdmin, (req, res) => {
    res.json({ msg: "Bienvenue, admin !" });
});




export default router;
