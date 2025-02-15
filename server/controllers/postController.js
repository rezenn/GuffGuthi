import { fetchPosts, createPost, removePost, fetchUserPosts, fetchLoggedInPosts  } from "../model/postModel.js";
import upload from "../middleware/ImageMulter.js";
import multer from "multer";

const postController = {
    // Get all posts for the current user
    async getPosts(req, res) {
        try {
            const currentUserId = req.userInfo; // Extract current user's ID from the token

            const posts = await fetchPosts(null, currentUserId); // Only pass currentUserId

            res.status(200).json(posts);
        } catch (err) {
            console.error("Error fetching posts:", err.message);
            res.status(500).json({ error: "Failed to fetch posts." });
        }
    },

    // Add a new post
    async addPost(req, res) {
      try {
          const { title, body } = req.body;
          const img = req.file ? `/uploads/posts/${req.file.filename}` : null;
  
          if (!title || !body) {
              return res.status(400).json({ message: "Title and body are required." });
          }
  
          const postDetails = {
              title,
              desc: body,
              img,
              userId: req.userInfo,
          };
  
          const data = await createPost(postDetails);
  
          res.status(201).json({
              message: "Post created successfully!",
              post: data,
          });
      } catch (error) {
          console.error("Error creating post:", error.message);
          res.status(500).json({ error: "Failed to create post." });
      }
  },
  

    // Delete a post
    async deletePost(req, res) {
    const postId = req.params.id;
    try {
        const data = await removePost(postId, req.userInfo);
        if (data) {
            return res.status(200).json("Post has been deleted.");
        } else {
            return res.status(403).json("You can delete only your post.");
        }
    } catch (err) {
        console.error("Error deleting post:", err.message);
        res.status(500).json({ error: "Failed to delete post." });
    }
},
async getUserPosts(req, res) {
    try {
        const userId = req.params.userId; // Get userId from URL params
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const posts = await fetchUserPosts(userId);
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        res.status(500).json({ error: "Failed to retrieve posts" });
    }
},
async getLoggedInPosts(req, res) {
    try {
        const userId = req.userInfo; // Extract user ID from token
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized access" });
        }
        const posts = await fetchLoggedInPosts(userId);
        if (!posts.length) {
            return res.status(404).json({ message: "No posts found" });
        }
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        res.status(500).json({ error: "Failed to retrieve posts" });
    }
},

};

export default postController;
