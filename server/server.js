import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import searchRoute from "./routes/searchRoutes.js";
import messageRoute from "./routes/messageRoutes.js"


// Get the directory name from the current module's URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    // origin: process.env.FRONTEND_URL || "http://localhost:5173", // Allow specific origin
    credentials: true,
};
app.use(cors(corsOptions));

// Serve static files from the "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/auth", authRoutes);
app.use("/home", homeRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/like", likeRoutes);
app.use("/comment", commentRoutes);
app.use("/search", searchRoute);
app.use("/message", messageRoute);

// Centralized error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
