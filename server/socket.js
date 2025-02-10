// import { addUser, getUser, removeUser, getUsersInRoom } from "./User.js";
// import { handleMessage, fetchPreviousMessages } from "./controllers/chatController.js";
// import { joinRoom } from "./controllers/roomController.js";

// const socketHandler = (io) => {
//     io.on("connection", (socket) => {
//         console.log("New WebSocket connection");

//         socket.on("join", async ({ name, room }, callback) => {
//             const { error, user } = addUser({ id: socket.id, name, room });

//             if (error) return callback(error);

//             socket.join(user.room);

//             socket.emit("message", {
//                 user: "admin",
//                 text: `${user.name}, welcome to the room ${room}.`,
//             });

//             socket.broadcast
//                 .to(user.room)
//                 .emit("message", { user: "admin", text: `${user.name} has joined the room.` });

//             io.to(user.room).emit("roomData", {
//                 room: user.room,
//                 users: getUsersInRoom(user.room),
//             });

//             await fetchPreviousMessages(socket, room);
//             callback();
//         });

//         socket.on("sendMessage", async (message, callback) => {
//             const user = getUser(socket.id);

//             if (!user) return callback("User not found");

//             io.to(user.room).emit("message", { user: user.name, text: message });

//             await handleMessage(socket, { user: user.name, text: message }, user.room);
//             callback();
//         });

//         socket.on("disconnect", () => {
//             const user = removeUser(socket.id);

//             if (user) {
//                 io.to(user.room).emit("message", {
//                     user: "admin",
//                     text: `${user.name} has left the room.`,
//                 });

//                 io.to(user.room).emit("roomData", {
//                     room: user.room,
//                     users: getUsersInRoom(user.room),
//                 });
//             }

//             console.log("User disconnected");
//         });
//     });
// };

// export default socketHandler;
