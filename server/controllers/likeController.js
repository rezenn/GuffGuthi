// const Like = require("../model/Like");

// exports.likePost = async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const userId = req.user.id;

//     const result = await Like.toggleLike(postId, userId);
//     return res.status(200).json({ message: result.liked ? "Post liked" : "Post unliked", liked: result.liked });
//   } catch (error) {
//     console.error("Error liking post:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// exports.getLikes = async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const likeCount = await Like.getLikesCount(postId);
//     return res.status(200).json({ likes: likeCount });
//   } catch (error) {
//     console.error("Error fetching likes:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
