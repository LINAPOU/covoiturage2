import express from 'express';
import {  getNotifications} from "../Controllers/notif.controller.js";

const router = express.Router();

router.get('/', getNotifications);

export default router;