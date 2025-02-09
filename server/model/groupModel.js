import pool from "../database/databaseConnect";

class Group {
    static async getGroup ({group_id}){
        const result = await pool.query(
            "SELECT group_id, group_name, "
        )
    }
}