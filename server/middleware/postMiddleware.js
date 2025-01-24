import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1]; // Extract token from "Bearer <token>"

        // Check if token is provided
        if (!token) {
            return res.status(403).json("Not Authorized.");
        }

        // Verify the token using jwt.verify
        const payload = jwt.verify(token, process.env.SECRET);
        req.userInfo = payload.user; // Attach decoded user info to req

        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error("Authorization Error:", err.message);
        return res.status(403).json("Not Authorized.");
    }
};