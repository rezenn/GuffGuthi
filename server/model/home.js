import pool from "../database/databaseConnect.js";

const getUserById = async (userId) => {
    const result = await pool.query(
        "SELECT user_name FROM users WHERE user_id = $1",
        [userId]
    );
    return result.rows[0]; // Returns { user_name: 'Name' } or undefined
};

export { getUserById };
