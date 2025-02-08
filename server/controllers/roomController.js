// import { findRoomByName, createRoom } from "../model/roomModel.js";

// export const joinRoom = async (socket, { name, room }) => {
//   try {
//     let roomId = await findRoomByName(room);
//     if (!roomId) {
//       roomId = await createRoom(room);
//     }

//     socket.join(room);
//     console.log(`${name} joined room ${room}`);
//   } catch (error) {
//     console.error("Error in joinRoom:", error);
//   }
// };
