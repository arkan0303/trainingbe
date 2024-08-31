import multer from "multer";
import path from "path";

// Tentukan tempat penyimpanan dan nama file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads")); // Menyimpan file di folder 'uploads'
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filter file yang diizinkan (PDF dan video)
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ["application/pdf", "video/mp4"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File type not allowed"), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 50, // Batas ukuran file 50MB
  },
});
