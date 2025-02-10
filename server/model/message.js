import pool from "../database/databaseConnect.js";

export const findConversation = async (senderId, receiverId) => {
    const query = `
        SELECT * FROM conversations
        WHERE participant_ids @> ARRAY[$1::uuid, $2::uuid]::uuid[]
    `;
    const result = await pool.query(query, [senderId, receiverId]);
    return result.rows[0];
};

export const createConversation = async (senderId, receiverId) => {
    const query = `
        INSERT INTO conversations (participant_ids)
        VALUES (ARRAY[$1::uuid, $2::uuid]::uuid[])
        RETURNING *
    `;
    const result = await pool.query(query, [senderId, receiverId]);
    return result.rows[0];
};

export const createMessage = async (senderId, message, conversationId) => {
    const query = `
        INSERT INTO messages (sender_id, body, conversation_id)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
    const result = await pool.query(query, [senderId, message, conversationId]);
    return result.rows[0];
};

export const updateConversation = async (conversationId, messageId) => {
    const query = `
        UPDATE conversations
        SET message_ids = array_append(message_ids, $1)
        WHERE id = $2
        RETURNING *
    `;
    const result = await pool.query(query, [messageId, conversationId]);
    return result.rows[0];
};

export const getMessagesByConversationId = async (conversationId) => {
    const query = `
        SELECT * FROM messages
        WHERE conversation_id = $1
        ORDER BY created_at ASC
    `;
    const result = await pool.query(query, [conversationId]);
    return result.rows;
};
export const getUsersForSidebar = async (authUserId) => {
    const query = `
        SELECT user_id, user_name, profilePic
        FROM users
        WHERE user_id != $1
    `;
    const result = await pool.query(query, [authUserId]);
    return result.rows;
};
