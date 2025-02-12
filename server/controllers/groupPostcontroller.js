import { fetchGroupPosts, createGroupPost, removeGroupPost } from "../model/groupPostModel.js";
import upload from "../middleware/ImageMulter.js";
import multer from "multer";

const groupPostController = {
    // Get all posts for the current user
    async getPosts(req, res) {
        try {
            const { group_id } = req.params; // Get the group ID from the request
    
            if (!group_id) {
                return res.status(400).json({ message: "Group ID is required." });
            }
    
            const posts = await fetchGroupPosts(group_id); // Fetch posts only for that group
    
            res.status(200).json(posts);
            console.log(posts)
        } catch (err) {
            console.error("Error fetching posts:", err.message);
            res.status(500).json({ error: "Failed to fetch posts." });
        }
    }
    ,

    // Add a new post
    async addPost(req, res) {
        try {
            const { title, body } = req.body;
            const { group_id } = req.params;
            const img = req.file ? `/uploads/groupPost/${req.file.filename}` : null;
    
            if (!title || !body || !group_id) {
                return res.status(400).json({ message: "Title, body, and group ID are required." });
            }
    
            const postDetails = {
                title,
                desc: body,
                img,
                userId: req.userInfo, // Extracted from authentication middleware
                groupId: group_id
            };
    
            const data = await createGroupPost(postDetails);
    
            res.status(201).json({
                message: "Post created successfully!",
                post: data,
            });
        } catch (error) {
            console.error("Error creating post:", error.message);
            res.status(500).json({ error: "Failed to create post." });
        }
    }
    ,

    // Delete a post
    async deletePost(req, res) {
    const postId = req.params.id;
    try {
        const data = await removeGroupPost(postId, req.userInfo);
        if (data) {
            return res.status(200).json("Post has been deleted.");
        } else {
            return res.status(403).json("You can delete only your post.");
        }
    } catch (err) {
        console.error("Error deleting post:", err.message);
        res.status(500).json({ error: "Failed to delete post." });
    }
}
};

export default groupPostController;
