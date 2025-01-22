import pool from "../database/databaseConnect.js";
import moment from "moment";

// Fetch posts
export const fetchPosts = (userId, currentUserId) => {
    const query = userId && userId !== "undefined"
        ? `SELECT p.*, u.user_id AS userId, u.user_name AS name, u.profilePic 
           FROM posts AS p 
           JOIN users AS u ON u.user_id = p.user_id 
           WHERE p.user_id = $1 
           ORDER BY p.created_at DESC`
        : `SELECT p.*, u.user_id AS userId, u.user_name AS name, u.profilePic 
           FROM posts AS p 
           JOIN users AS u ON u.user_id = p.user_id 
           LEFT JOIN follow AS f ON p.user_id = f.followedUser_id 
           WHERE f.followerUser_id = $1 OR p.user_id = $2 
           ORDER BY p.created_at DESC`;

    const values = userId && userId !== "undefined"
        ? [userId]
        : [currentUserId, currentUserId];

    return new Promise((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results.rows);
        });
    });
};

// Add a post
export const createPost = (postDetails, callback) => {
    const query =
        "INSERT INTO posts (post_desc, img, created_at, user_id) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [
        postDetails.desc,
        postDetails.img,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        postDetails.userId,
    ];

    pool.query(query, values, callback);
};

// Delete a post
export const removePost = (postId, userId, callback) => {
    const query = "DELETE FROM posts WHERE post_id = $1 AND user_id = $2";
    pool.query(query, [postId, userId], callback);
};
