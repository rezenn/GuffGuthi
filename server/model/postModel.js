import pool from "../database/databaseConnect.js";
import moment from "moment";

// Fetch posts
export const fetchPosts = (userId, currentUserId) => {
    const query = userId && userId !== "undefined"
        ? `SELECT p.*, u.user_id AS userId, u.user_name AS name, u.profilePic 
           FROM posts AS p 
           JOIN test AS u ON u.user_id = p.user_id 
           WHERE p.user_id = ? 
           ORDER BY p.created_at DESC`
        : `SELECT p.*, u.user_id AS userId, u.user_name AS name, u.profilePic 
           FROM posts AS p 
           JOIN test AS u ON u.user_id = p.user_id 
           LEFT JOIN follow AS f ON p.user_id = f.followedUser_id 
           WHERE f.followerUser_id = ? OR p.user_id = ? 
           ORDER BY p.created_at DESC`;

    const values = userId && userId !== "undefined"
        ? [userId]
        : [currentUserId, currentUserId]; // We use currentUserId here

    return new Promise((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};


// Add a post
export const createPost = (postDetails, callback) => {
    const query =
        "INSERT INTO posts(`desc`, `img`, `createdAt`, `userId`) VALUES (?)";
    const values = [
        postDetails.desc,
        postDetails.img,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        postDetails.userId,
    ];

    pool.query(query, [values], callback);
};

// Delete a post
export const removePost = (postId, userId, callback) => {
    const query = "DELETE FROM posts WHERE `id`=? AND `userId`=?";
    pool.query(query, [postId, userId], callback);
};
