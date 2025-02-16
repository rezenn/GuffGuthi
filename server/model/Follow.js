import pool from "../database/databaseConnect.js";

class Follow {
    static async create({ followerUserId, followedUserId }) {
        const result = await pool.query(
            `INSERT INTO follow (followerUser_id, followedUser_id) 
             VALUES ($1, $2) RETURNING *`,
            [followerUserId, followedUserId]
        );
        return result.rows[0];
    }

    static async delete(followerUserId, followedUserId) {
        await pool.query(
            `DELETE FROM follow WHERE followerUser_id = $1 AND followedUser_id = $2`,
            [followerUserId, followedUserId]
        );
    }

    static async getFollowers(userId) {
        const result = await pool.query(
            `SELECT users.* FROM follow 
             JOIN users ON follow.followerUser_id = users.user_id 
             WHERE follow.followedUser_id = $1`,
            [userId]
        );
        return result.rows;
    }

    static async getFollowing(userId) {
        const result = await pool.query(
            `SELECT users.* FROM follow 
             JOIN users ON follow.followedUser_id = users.user_id 
             WHERE follow.followerUser_id = $1`,
            [userId]
        );
        return result.rows;
    }
}

export default Follow;
