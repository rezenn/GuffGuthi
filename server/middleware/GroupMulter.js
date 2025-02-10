import multer from "multer";
import path from "path";

// Configure storage settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/group/"); // Store files in 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
});

// Filter to allow only image uploads
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

// Initialize Multer
const upload = multer({
    storage,
    fileFilter
});

export default upload;