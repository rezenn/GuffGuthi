import pool from "../database/databaseConnect.js";

export const fetchComments = (postId) => {
  const query = `SELECT c.*, u.user_id AS userId, u.user_name AS name, u.profilePic 
                 FROM comments AS c 
                 JOIN users AS u ON u.user_id = c.user_id 
                 WHERE c.post_id = $1 
                 ORDER BY c.created_at DESC`;
  
  return new Promise((resolve, reject) => {
    pool.query(query, [postId], (err, results) => {
      if (err) {
        console.error("Database query error:", err.message); // Debugging line
        return reject(err);
      }
      console.log("Query results:", results.rows); // Debugging line
      resolve(results.rows);
    });
  });
};

export const createComment = async (commentDetails) => {
    const query = "INSERT INTO comments (comments_desc, created_at, user_id, post_id) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [
        commentDetails.desc,
        commentDetails.createdAt,
        commentDetails.userId,
        commentDetails.postId
    ];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error("Error creating comment:", err.message);
        throw err;
    }
};

export const removeComment = (commentId, userId) => {
    const query = "DELETE FROM comments WHERE comments_id = $1 AND user_id = $2";
    return new Promise((resolve, reject) => {
        pool.query(query, [commentId, userId], (err, results) => {
            if (err) return reject(err);
            resolve(results.rowCount > 0);
        });
    });
};
