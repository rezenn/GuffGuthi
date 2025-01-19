// postController.js
import { fetchPosts, createPost, removePost } from "../model/postModel.js";


export const getPosts = async (req, res) => {
    try {
        console.log("User Info from Token:", req.userInfo); // Debugging the user info attached by the middleware

        const currentUserId = req.userInfo.id; // Extract current user's ID from the token
        console.log("User ID:", currentUserId); // Debugging

        // Fetch posts using the model function
        const posts = await fetchPosts(null, currentUserId); // Only pass currentUserId
        console.log("Fetched Posts:", posts);

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
        userId: req.userInfo.id,
    };

    createPost(postDetails, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been created.");
    });
};

export const deletePost = (req, res) => {
    const postId = req.params.id;

    removePost(postId, req.userInfo.id, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) {
            return res.status(200).json("Post has been deleted.");
        }
        return res.status(403).json("You can delete only your post.");
    });
};
