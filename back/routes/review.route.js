import express from "express";
import { createReview, getAllReviews } from "../Controllers/review.controller.js";
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post("/",verifyToken, createReview);
router.get("/", getAllReviews);

export default router;
