import pool from "../database/databaseConnect.js";

export const getAllRequests = async () => {
    const { rows } = await pool.query("SELECT * FROM community_requests ORDER BY created_at DESC");
    return rows;
};

export const getRequestById = async (id) => {
    const { rows } = await pool.query("SELECT * FROM community_requests WHERE id = $1", [id]);
    return rows[0];
};

export const createRequest = async ({ title, start_date, end_date, location, description }) => {
    const { rows } = await pool.query(
        "INSERT INTO community_requests (title, start_date, end_date, location, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [title, start_date, end_date, location, description]
    );
    return rows[0];
};
