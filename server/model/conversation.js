import pool from "../database/databaseConnect.js";

export const findConversation = async (participantIds) => {
    const query = `
        SELECT * FROM conversations
        WHERE participant_ids @> $1::text[]
    `;
    const { rows } = await pool.query(query, [participantIds]);
    return rows[0];
};

export const createConversation = async (participantIds) => {
    const query = `
        INSERT INTO conversations (participant_ids)
        VALUES ($1)
        RETURNING *
    `;
    const { rows } = await pool.query(query, [participantIds]);
    return rows[0];
};

export const updateConversation = async (conversationId, messageId) => {
    const query = `
        UPDATE conversations
        SET message_ids = array_append(message_ids, $1)
        WHERE id = $2
        RETURNING *
    `;
    const { rows } = await pool.query(query, [messageId, conversationId]);
    return rows[0];
};
