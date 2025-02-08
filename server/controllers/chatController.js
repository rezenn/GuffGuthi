// import { saveMessage, getMessagesByRoom } from "../model/chatModel.js";
// import { findRoomByName } from "../model/roomModel.js";

// export const handleMessage = async (socket, message, room) => {
//   try {
//     const roomId = await findRoomByName(room);
//     if (!roomId) return;

//     await saveMessage(roomId, message.user, message.text);
//     socket.to(room).emit("message", message);
//   } catch (error) {
//     console.error("Error handling message:", error);
//   }
// };

// export const fetchPreviousMessages = async (socket, room) => {
//   try {
//     const roomId = await findRoomByName(room);
//     if (!roomId) return;

//     const messages = await getMessagesByRoom(roomId);
//     socket.emit("previousMessages", messages);
//   } catch (error) {
//     console.error("Error fetching previous messages:", error);
//   }
// };
