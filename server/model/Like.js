// import pool from "../database/databaseConnect.js";

// class Like {
//   static async toggleLike(postId, userId) {
//     const existingLike = await pool.query(
//       "SELECT * FROM likes WHERE user_id = $1 AND post_id = $2",
//       [userId, postId]
//     );

//     if (existingLike.rows.length > 0) {
//       await pool.query("DELETE FROM likes WHERE user_id = $1 AND post_id = $2", [userId, postId]);
//       return { liked: false };
//     } else {
//       await pool.query("INSERT INTO likes (user_id, post_id) VALUES ($1, $2)", [userId, postId]);
//       return { liked: true };
//     }
//   }

//   static async getLikesCount(postId) {
//     const result = await pool.query("SELECT COUNT(*) FROM likes WHERE post_id = $1", [postId]);
//     return parseInt(result.rows[0].count);
//   }
// }

// export default Like;
import pool from "../database/databaseConnect.js";

class Like {
  static async toggleLike(postId, userId) {
    try {
      const [existingLike] = await pool.query(
        "SELECT * FROM likes WHERE post_id = ? AND user_id = ?",
        [postId, userId]
      );

      if (existingLike.length > 0) {
        await pool.query("DELETE FROM likes WHERE post_id = ? AND user_id = ?", [postId, userId]);
        return { liked: false };
      } else {
        await pool.query("INSERT INTO likes (post_id, user_id) VALUES (?, ?)", [postId, userId]);
        return { liked: true };
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      throw error;
    }
  }

  static async getLikesCount(postId) {
    try {
      const [rows] = await pool.query("SELECT COUNT(*) AS likeCount FROM likes WHERE post_id = ?", [postId]);
      return rows[0].likeCount;
    } catch (error) {
      console.error("Error getting likes count:", error);
      throw error;
    }
  }
}

export default Like;
