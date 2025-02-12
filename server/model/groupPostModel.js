import pool from "../database/databaseConnect.js";
import moment from "moment";

export const fetchGroupPosts = (groupId) => {
    const query = `
        SELECT p.*, u.user_id AS userId, u.user_name AS name, u.profilePic 
        FROM GroupPosts AS p 
        JOIN users AS u ON u.user_id = p.user_id 
        WHERE p.group_id = $1 
        ORDER BY p.created_at DESC
    `;

    return new Promise((resolve, reject) => {
        pool.query(query, [groupId], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results.rows);
        });
    });
};


export const createGroupPost = async (postDetails) => {
    const query = `
        INSERT INTO GroupPosts (group_post_title, group_post_desc, img, created_at, user_id, group_id) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `;
    const values = [
        postDetails.title,
        postDetails.desc,
        postDetails.img,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        postDetails.userId,
        postDetails.groupId
    ];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error("Error creating post:", err.message);
        throw err;
    }
};


export const removeGroupPost = (postId, userId, callback) => {
    const query = "DELETE FROM GroupPosts WHERE group_post_id = $1 AND user_id = $2";
    pool.query(query, [postId, userId], callback);
};