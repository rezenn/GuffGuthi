import User from "../model/User.js";

const userController = {
    // Get user profile (without password)
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

    // Update user profile (all fields in a single request)
    async updateProfile(req, res) {
        try {
            const { email } = req.params;
            const { user_name, bio, occupation, location } = req.body;
    
            // Check if new files are provided, otherwise set to null
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
};

export default userController;
