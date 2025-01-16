// postController.js
import { fetchPosts, createPost, removePost } from "../model/postModel.js";

export const getPosts = (req, res) => {
    const userId = req.query.userId;

    fetchPosts(userId, req.userInfo.id, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
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
