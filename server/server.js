import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url"; // Import fileURLToPath

import authRoutes from "./routes/authRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

// Get the directory name from the current module's URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Extract __dirname using fileURLToPath

const app = express();

// Middleware
app.use(express.json());

const corsOptions = {
    // origin: 'http://localhost:5173', // Specific origin
    credentials: true
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Static files for uploads

// Routes
app.use("/auth", authRoutes);
app.use("/home", homeRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/like", likeRoutes);
app.use("/comment", commentRoutes);

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`The app is running at port: ${PORT}`);
});
