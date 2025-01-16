import { getUserById } from "../model/home.js";

export const getUserInfo = async (req, res) => {
    try {
        const user = await getUserById(req.user);

        if (!user) {
            return res.status(404).json("User not found");
        }

        res.json(user); // Sends { user_name: "Name" }
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
};
