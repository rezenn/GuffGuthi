import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();

// Middleware
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173', // Specific origin

    credentials: true
};

app.use(cors(corsOptions)); app.use(cookieParser());


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