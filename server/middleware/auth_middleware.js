import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default async (req, res, next) => {
    try {
        const jwtToken = req.header("token");

        // Check if the token is provided
        if (!jwtToken) {
            return res.status(403).json("Not Authorized1.");
        }

        // Verify the token using jwt.verify
        const payload = jwt.verify(jwtToken, process.env.SECRET);
        req.user = payload.user;

        next(); // Proceed to the next middleware/route
    } catch (err) {
        console.error(err.message);

        // If an error occurs, ensure no response has been sent yet
        if (!res.headersSent) {
            return res.status(403).json("Not Authorized2.");
        }
    }
}
