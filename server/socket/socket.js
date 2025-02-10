import { Server } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import formatMessage from "./utils/messages.js";
import { userJoin, getCurrentUser, userLeave, getRoomUsers } from "./utils/users.js";

const botName = "ChatCord Bot";

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
            credentials: true
        }
    });

    (async () => {
        const pubClient = createClient({ url: "redis://127.0.0.1:6379" });
        await pubClient.connect();
        const subClient = pubClient.duplicate();
        io.adapter(createAdapter(pubClient, subClient));
    })();

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("joinRoom", ({ username, room }) => {
            const user = userJoin(socket.id, username, room);
            socket.join(user.room);

            socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

            socket.broadcast.to(user.room).emit(
                "message",
                formatMessage(botName, `${user.username} has joined the chat`)
            );

            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        });

        socket.on("chatMessage", (msg) => {
            const user = getCurrentUser(socket.id);
            if (user) {
                io.to(user.room).emit("message", formatMessage(user.username, msg));
            }
        });

        socket.on("disconnect", () => {
            const user = userLeave(socket.id);
            if (user) {
                io.to(user.room).emit(
                    "message",
                    formatMessage(botName, `${user.username} has left the chat`)
                );

                io.to(user.room).emit("roomUsers", {
                    room: user.room,
                    users: getRoomUsers(user.room)
                });
            }
        });
    });
};

export default initializeSocket;
