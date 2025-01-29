import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export default async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];

        if (!token) {
            return res.status(403).json({ message: "Access denied. No token provided." });
        }

        const payload = jwt.verify(token, process.env.SECRET);
        req.userInfo = payload.user;

        next();
    } catch (err) {
        console.error("Authorization Error:", err.message);
        res.status(403).json({ message: "Invalid or expired token." });
    }
};