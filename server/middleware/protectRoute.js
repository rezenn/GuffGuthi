import jwt from "jsonwebtoken";
import pool from "../database/databaseConnect.js"; // Assuming you are using this for DB connection

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }

        // Verifying the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        // Query to find the user by ID
        const query = 'SELECT id, user_name, full_name, profilePic FROM users WHERE user_id = $1';
        const { rows } = await pool.query(query, [decoded.userId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Attaching the user information to the request object
        req.user = rows[0];
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default protectRoute;
