import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();


import authRoutes from "./routes/authRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import groupPostRoutes from "./routes/groupPostRoutes.js"
// import likeRoutes from "./routes/likeRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import searchRoute from "./routes/searchRoutes.js";
import groupRoute from "./routes/groupRoutes.js";
import communityServiceRoutes from "./routes/communityServiceRoutes.js";
import followRoutes from "./routes/followRoutes.js"


import { addUser, getUser, removeUser, getUsersInRoom } from "./User.js";

// Get the directory name from the current module's URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        credentials: true,
    },
});

// WebSocket events
io.on("connection", (socket) => {
    console.log("New WebSocket connection");

    socket.on("join", ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
      
        if (error) return callback(error);
      
        socket.join(user.room);
      
        socket.emit("message", {
          user: " ",
          text: `${user.name}, welcome to the room ${room}.`,
        });
      
        socket.broadcast
          .to(user.room)
          .emit("message", { user: " ", text: `${user.name} has joined the room.` });
      
        io.to(user.room).emit("roomData", {
          room: user.room,
          users: getUsersInRoom(user.room), // Emit the list of users in the room
        });
      
        callback();
      });
      

    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);

        if (!user) return callback("User not found");

        io.to(user.room).emit("message", { user: user.name, text: message });

        callback();
    });

    socket.on("disconnect", () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit("message", {
                user: " ",
                text: `${user.name} has left the room.`,
            });

            io.to(user.room).emit("roomData", {
                room: user.room,
                users: getUsersInRoom(user.room),
            });
        }

        console.log("User disconnected");
    });
});

// Middleware
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
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
app.use("/groupFeed", groupPostRoutes);
// app.use("/like", likeRoutes);
app.use("/comment", commentRoutes);
app.use("/search", searchRoute);
app.use("/group", groupRoute);
app.use("/api/community", communityServiceRoutes);
app.use("/follow",followRoutes)

// Centralized error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
