import express from 'express';
import { isAdmin } from "../middleware/authMiddleware.js";
import { verifyToken } from '../middleware/verifyToken.js';

import { protect } from "../middleware/protectMiddleware.js";
import { isDriver, uploadDocument } from "../middleware/DriverMiddlware.js"; // Import corrigé
import { uploadDocuments, validateDriver, getPendingDrivers,checkvalidation } from "../Controllers/driver.controller.js";

const router = express.Router();
// Utilisation correcte de uploadDocument
router.post("/upload-documents", protect, uploadDocument, uploadDocuments);

router.post("/validateDriver", validateDriver);
router.get('/check-validation', verifyToken, checkvalidation);  // Ici, la route doit correspondre


router.get("/admin/pending-drivers", getPendingDrivers);

export default router;