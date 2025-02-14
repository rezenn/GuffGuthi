    import multer from "multer";
    import path from "path";

    // Configure storage settings
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/profiles/"); // Store files in 'uploads/profiles/'
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const ext = path.extname(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`); // e.g., profilePic-1234567890.jpg
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
        fileFilter,
        limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    });

    export default upload;