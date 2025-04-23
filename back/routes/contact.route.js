import express from "express";
import { sendMessagetoadmin, getMessages ,sendMessagetodriver} from "../Controllers/contact.controller.js";
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post("/", verifyToken, sendMessagetoadmin); // ✅ Un utilisateur envoie un message (srvice cleint et chat)
router.post("/:chatId", verifyToken, sendMessagetodriver); // ✅ Un utilisateur envoie un message (srvice cleint et chat)

router.get("/messages", verifyToken, getMessages); // ✅ Un admin récupère tous les messages

export default router;
