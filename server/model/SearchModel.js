import pool from "../database/databaseConnect.js";

class Search {
    static async searchPosts(query) {
        const sqlQuery = `
            SELECT p.post_title, u.user_name AS name, p.created_at 
            FROM posts p
            JOIN users u ON p.user_id = u.user_id
            WHERE u.user_name ILIKE $1 OR p.post_title ILIKE $2
            ORDER BY p.created_at DESC
        `;
        const values = [`%${query}%`, `%${query}%`];

        try {
            const result = await pool.query(sqlQuery, values);
            return result.rows;
        } catch (err) {
            console.error("Error searching posts:", err.message);
            throw new Error("Database query failed.");
        }
    }
}

export default Search;
