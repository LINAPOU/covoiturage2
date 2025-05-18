import multer from "multer";


export const isDriver = async (req, res, next) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  console.log("User dans protect :", req.user);

  if (!user.isDriver) {
    return res.status(403).json({ msg: "Accès réservé aux chauffeurs validés." });
  }
  next();
};


// Définir l'endroit où stocker les fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Le dossier où les fichiers seront enregistrés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Renommer les fichiers
  },
});

// Filtrage des types de fichiers autorisés
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const mimeType = allowedTypes.test(file.mimetype);
  if (mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Type de fichier non autorisé"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Utiliser multer avec un champ spécifique pour chaque document
const uploadDocument = upload.fields([
  { name: "identityCard", maxCount: 1 },
  { name: "carRegistration", maxCount: 1 },
  { name: "vehicleCard", maxCount: 1 },
]);

export { uploadDocument };