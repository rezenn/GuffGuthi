import pool from "../database/databaseConnect.js";
import moment from "moment";

// Fetch posts
export const fetchPosts = (userId, currentUserId, callback) => {
    const query =
        userId !== "undefined"
            ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p 
         JOIN users AS u ON (u.id = p.userId) 
         WHERE p.userId = ? ORDER BY p.createdAt DESC`
            : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p 
         JOIN users AS u ON (u.id = p.userId)
         LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) 
         WHERE r.followerUserId= ? OR p.userId =? 
         ORDER BY p.createdAt DESC`;

    const values = userId !== "undefined" ? [userId] : [currentUserId, currentUserId];

    pool.query(query, values, callback);
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
