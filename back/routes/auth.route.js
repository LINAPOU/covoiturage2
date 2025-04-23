import express from 'express';
import { login, signup, logout } from "../Controllers/auth.controller.js";

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);


export default router;
// Compare this snippet from back/src/models/routes/user.route.js: