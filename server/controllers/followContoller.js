// import Follow from "../model/Follow.js";

// export const followUser = async (req, res) => {
//     const { followerUserId, followedUserId } = req.body;

//     try {
//         if (followerUserId === followedUserId) {
//             return res.status(400).json("You cannot follow yourself.");
//         }

//         const follow = await Follow.create({ followerUserId, followedUserId });
//         return res.status(201).json(follow);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server error");
//     }
// };

// export const unfollowUser = async (req, res) => {
//     const { followerUserId, followedUserId } = req.body;

//     try {
//         await Follow.delete(followerUserId, followedUserId);
//         return res.status(200).json("Unfollowed successfully.");
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server error");
//     }
// };

// export const getFollowers = async (req, res) => {
//     const { userId } = req.params;

//     try {
//         const followers = await Follow.getFollowers(userId);
//         return res.json(followers);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server error");
//     }
// };

// export const getFollowing = async (req, res) => {
//     const { userId } = req.params;

//     try {
//         const following = await Follow.getFollowing(userId);
//         return res.json(following);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server error");
//     }
// };
