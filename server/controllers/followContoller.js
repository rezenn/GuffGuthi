import Follow from "../model/Follow.js";

export const followUser = async (req, res) => {
    const { followerUserId, followedUserId } = req.body;

    // Debugging: Log the IDs
    console.log("Follower ID:", followerUserId);
    console.log("Followed ID:", followedUserId);

    try {
        if (!followerUserId || !followedUserId) {
            return res.status(400).json({ error: "Both user IDs are required." });
        }

        if (String(followerUserId) === String(followedUserId)) {
            return res.status(400).json({ error: "You cannot follow yourself." });
        }

        const follow = await Follow.create({ followerUserId, followedUserId });
        return res.status(201).json({ message: "Followed successfully", follow });
    } catch (err) {
        console.error("Error in followUser:", err.message);
        res.status(500).json({ error: "Server error" });
    }
};

export const unfollowUser = async (req, res) => {
    const { followerUserId, followedUserId } = req.body;

    try {
        if (!followerUserId || !followedUserId) {
            return res.status(400).json({ error: "Both user IDs are required." });
        }

        await Follow.delete(followerUserId, followedUserId);
        return res.status(200).json({ message: "Unfollowed successfully" });
    } catch (err) {
        console.error("Error in unfollowUser:", err.message);
        res.status(500).json({ error: "Server error" });
    }
};

export const getFollowers = async (req, res) => {
    const { userId } = req.params;

    try {
        if (!userId) {
            return res.status(400).json({ error: "User ID is required." });
        }

        const followers = await Follow.getFollowers(userId);
        return res.json(followers);
    } catch (err) {
        console.error("Error in getFollowers:", err.message);
        res.status(500).json({ error: "Server error" });
    }
};

export const getFollowing = async (req, res) => {
    const { userId } = req.params;

    try {
        if (!userId) {
            return res.status(400).json({ error: "User ID is required." });
        }

        const following = await Follow.getFollowing(userId);
        return res.json(following);
    } catch (err) {
        console.error("Error in getFollowing:", err.message);
        res.status(500).json({ error: "Server error" });
    }
};
