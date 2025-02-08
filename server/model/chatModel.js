// import pool from "../database/databaseConnect";

// export const saveMessage = async (roomId, user, text) => {
//   try {
//     await pool.query(
//       "INSERT INTO messages (room_id, user_name, text) VALUES ($1, $2, $3)",
//       [roomId, user, text]
//     );
//   } catch (error) {
//     console.error("Error saving message:", error);
//   }
// };

// export const getMessagesByRoom = async (roomId) => {
//   try {
//     const result = await pool.query(
//       "SELECT user_name, text, created_at FROM messages WHERE room_id = $1 ORDER BY created_at ASC",
//       [roomId]
//     );
//     return result.rows;
//   } catch (error) {
//     console.error("Error retrieving messages:", error);
//     return [];
//   }
// };
