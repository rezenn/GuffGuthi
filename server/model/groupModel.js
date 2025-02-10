import pool from "../database/databaseConnect.js";

class Group {
    static async getGroup ({group_id}){
        const result = await pool.query(
            "SELECT group_name, group_logo, group_cover, topic, group_desc FROM groups WHERE group_id =$1",
            [group_id]
        );
        return result.rows[0];
    }

    static async createGroup(group_name, group_logo, group_cover, topic, group_desc) {
        const result = await pool.query(
            "INSERT INTO groups (group_name, group_logo, group_cover, topic, group_desc) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [group_name, group_logo, group_cover, topic, group_desc]
        );
        return result.rows[0];
    }

    static async UpdateGroup ( group_logo, group_cover, topic, group_desc, group_id){
        const result = await pool.query(
            "UPDATE groups SET  group_logo = $1, group_cover = $2, topic = $3, group_desc = $4 WHERE group_id = $5 RETURNING *",
            [group_logo, group_cover, topic, group_desc, group_id]
        );
        return result.rows[0];
    }

    static async getAllGroups() {
        const result = await pool.query("SELECT * FROM groups ORDER BY created_at DESC");
        return result.rows;
    }
    
}

export default Group;