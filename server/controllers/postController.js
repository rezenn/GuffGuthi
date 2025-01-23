// postController.js
import { fetchPosts, createPost, removePost } from "../model/postModel.js";
import multer from "multer";

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname); // Unique file name
    },
});
const upload = multer({ storage });

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
    upload.single("image")(req, res, async (err) => {
        if (err) return res.status(500).json({ message: "File upload failed." });

        const { title, body } = req.body;
        if (!title || !body) {
            return res.status(400).json({ message: "Title and body are required." });
        }

        const postDetails = {
            title,
            desc: body,
            img: req.file ? `/uploads/${req.file.filename}` : null,
            userId: req.userInfo,
        };

        try {
            const data = await createPost(postDetails);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Failed to create post." });
        }
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
