import User from "../model/User.js";

const userController = {
    async getProfile(req, res) {
        try {
            const { email } = req.params;
            const user = await User.getProfile({ email });

            if (!user) {
                return res.status(404).json({ error: "User not found." });
            }

            res.status(200).json(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Failed to retrieve user info." });
        }
    },
    async getUser(req, res) {
        try {
            const { userId } = req.params;
            const user = await User.getUser({ userId });

            if (!user) {
                return res.status(404).json({ error: "User not found." });
            }

            res.status(200).json(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Failed to retrieve user info." });
        }
    },


    async updateProfile(req, res) {
        try {
            const { email } = req.params;
            const { user_name, bio, occupation, location } = req.body;
    
            const profilePic = req.files?.profilePic ? `/uploads/profiles/${req.files.profilePic[0].filename}` : null;
            const coverPhoto = req.files?.coverPhoto ? `/uploads/profiles/${req.files.coverPhoto[0].filename}` : null;
    
            const updatedUser = await User.updateProfile({
                user_name,
                bio,
                occupation,
                location,
                profilePic,
                coverPic: coverPhoto,
                email,
            });
    
            if (!updatedUser) {
                return res.status(404).json({ error: "User not found." });
            }
    
            res.status(200).json({
                message: "Profile updated successfully",
                user: updatedUser,
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Failed to update profile" });
        }
    },

    async userMessage(req, res) {
        try {
            console.log("Fetching all users...");
            const users = await User.getAllUsers();
    
            if (!Array.isArray(users)) {
                return res.status(500).json({ error: "Invalid data format: expected an array." });
            }
    
            console.log("Users found:", users);
            res.json(users);  // Ensure response is an array
        } catch (error) {
            console.error("Error fetching users:", error.message);
            res.status(500).json({ error: "Failed to retrieve user info." });
        }
    },
    async getAllUser(req, res) {
        try {
            const users = await User.getAllUser();
            res.status(200).json(users);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Failed to retrieve users." });
        }
    },

    
    
};

export default userController;
