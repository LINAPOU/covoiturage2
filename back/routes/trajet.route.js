import express from 'express';
import { getTrajets, getTrajet, AddTrajet,updateTrajet,deleteTrajet } from "../Controllers/trajet.controller.js";
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();


router.get('/', getTrajets); // accessible sans token

router.get('/:id',  getTrajet);
router.post('/', verifyToken,AddTrajet );
router.put('/:id', verifyToken, updateTrajet);
router.delete('/:id', verifyToken, deleteTrajet);


export default router;