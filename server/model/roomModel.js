// import pool from "../database/databaseConnect";

// export const findRoomByName = async (roomName) => {
//   try {
//     const result = await pool.query("SELECT id FROM rooms WHERE name = $1", [roomName]);
//     return result.rows.length ? result.rows[0].id : null;
//   } catch (error) {
//     console.error("Error finding room:", error);
//     return null;
//   }
// };

// export const createRoom = async (roomName) => {
//   try {
//     const result = await pool.query(
//       "INSERT INTO rooms (name) VALUES ($1) RETURNING id",
//       [roomName]
//     );
//     return result.rows[0].id;
//   } catch (error) {
//     console.error("Error creating room:", error);
//     return null;
//   }
// };
