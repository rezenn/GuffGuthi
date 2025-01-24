import bcrypt from "bcrypt";
import jwtGenerator from "../utils/jwtGenerator.js";
import User from "../model/User.js";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findByEmail(email);

        if (existingUser) {
            return res.status(401).send("User already exists.");
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ name, email, password: bcryptPassword });
        const jwtToken = jwtGenerator(newUser.user_id);

        return res.json({ jwtToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByEmail(email);

        if (!user) {
            return res.status(401).json("Incorrect email or password.");
        }

        const validPassword = await bcrypt.compare(password, user.user_password);

        if (!validPassword) {
            return res.status(401).json("Incorrect email or password.");
        }

        const jwtToken = jwtGenerator(user.user_id);
        return res.json({ jwtToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
export const  forgotPassword = async(req, res) => {
    const {email, newPassword} = req.body;

    try{
        const user = await User.findByEmail(email);
        if(!user){
            return res.status(401).json("User not found")
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(newPassword,salt);
        const updateUser= await User.updatePassword({email, password: bcryptPassword})
        if (!updateUser) {
            return res.status(500).json("Failed to update password");
        }
        return res.status(200).json("Password updated successfully");
    } catch (error) {
        console.error("Error in forgotPassword:", error.message);
        res.status(500).json("Internal Server Error");
    }
};

export const verifyUser = async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
