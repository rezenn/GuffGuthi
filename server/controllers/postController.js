// postController.js
import { fetchPosts, createPost, removePost } from "../model/postModel.js";

export const getPosts = async (req, res) => {
    try {

        const currentUserId = req.userInfo; // Extract current user's ID from the token

        // Fetch posts using the model function
        const posts = await fetchPosts(null, currentUserId); // Only pass currentUserId

        return res.status(200).json(posts);
    } catch (err) {
        console.error("Error fetching posts:", err.message);
        return res.status(500).json("Failed to fetch posts.");
    }
};

export const addPost = (req, res) => {
    const postDetails = {
        desc: req.body.desc,
        img: req.body.img,
        userId: req.userInfo, // Use the correct field to access the user ID
    };

    createPost(postDetails, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been created.");
    });
};

export const deletePost = (req, res) => {
    const postId = req.params.id;

    removePost(postId, req.userInfo, (err, data) => { // Use the correct field to access the user ID
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) {
            return res.status(200).json("Post has been deleted.");
        }
        return res.status(403).json("You can delete only your post.");
    });
};
