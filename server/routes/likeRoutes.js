// import express from "express";
// import { likePost, getLikes } from "../controllers/likeController.js";
// import authenticate from "../middleware/auth_middleware.js";

// const router = express.Router();

// router.post("/like/:postId", authenticate, likePost);
// router.get("/likes/:postId", getLikes);

// export default router;

import express from "express";
import Like from "../model/Like.js";
import authenticateUser from "../middleware/auth_middleware.js"; // Assuming you have authentication middleware

const router = express.Router();

// Route to like/unlike a post
router.post("/like/:postId", authenticateUser, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id; // Assuming `authenticateUser` middleware attaches `user` to `req`

    const result = await Like.toggleLike(postId, userId);
    return res.status(200).json({ 
      message: result.liked ? "Post liked" : "Post unliked", 
      liked: result.liked 
    });
  } catch (error) {
    console.error("Error liking post:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Route to get like count for a post
router.get("/likes/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const likeCount = await Like.getLikesCount(postId);
    return res.status(200).json({ likes: likeCount });
  } catch (error) {
    console.error("Error fetching likes:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
