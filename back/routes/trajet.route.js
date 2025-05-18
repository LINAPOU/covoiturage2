import express from 'express';
import { getTrajets, getTrajet, AddTrajet,updateTrajet,deleteTrajet,reducePlaceInTrajet,reserverTrajet} from "../Controllers/trajet.controller.js";
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();


router.get('/', getTrajets); // accessible sans token

router.get('/:id',  getTrajet);
router.post('/', verifyToken,AddTrajet );
router.put('/:id', verifyToken, updateTrajet);
router.delete('/:id', verifyToken, deleteTrajet);

router.post("/:id/reduce-place", verifyToken, reducePlaceInTrajet);
router.post("/:id/reserver", verifyToken, reserverTrajet); // Réservation d'un trajet

export default router;