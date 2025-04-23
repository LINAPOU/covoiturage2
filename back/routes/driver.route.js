import express from 'express';
import { isAdmin } from "../middleware/authMiddleware.js";

import { protect } from "../middleware/protectMiddleware.js";
import { isDriver, uploadDocument } from "../middleware/DriverMiddlware.js"; // Import corrigé
import { uploadDocuments, validateDriver, getPendingDrivers } from "../Controllers/driver.controller.js";

const router = express.Router();
// Utilisation correcte de uploadDocument
router.post("/upload-documents", protect, uploadDocument, uploadDocuments);

router.post("/validateDriver", protect, isDriver, validateDriver);


router.get("/admin/pending-drivers", protect, isAdmin, getPendingDrivers);

export default router;
