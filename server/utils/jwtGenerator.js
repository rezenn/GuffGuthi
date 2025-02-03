// jwtGenerator.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function jwtGenerator(user_id) {
    const payLoad = {
        user: user_id,

    };

    return jwt.sign(payLoad, process.env.SECRET, { expiresIn: "24hr" });
}

export default jwtGenerator;
