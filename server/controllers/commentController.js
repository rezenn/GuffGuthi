// controllers/commentController.js
import { fetchComments, createComment, removeComment } from "../model/commentModel.js";
import moment from "moment";

const commentController = {
    async getComments(req, res) {
    try {
        const postId = parseInt(req.query.postId, 10);
        if (!postId || isNaN(postId)) return res.status(400).json({ error: "Invalid Post ID." });

        const comments = await fetchComments(postId);
        res.status(200).json(comments);
    } catch (err) {
        console.error("Error fetching comments:", err.message);
        res.status(500).json({ error: "Failed to fetch comments." });
    }
}
,

    async addComment(req, res) {
        try {
            const { desc, postId } = req.body;
            if (!desc || !postId) return res.status(400).json("Description and Post ID are required.");

            const commentDetails = {
                desc,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                userId: req.userInfo,
                postId
            };

            const data = await createComment(commentDetails);
            res.status(201).json({ message: "Comment has been created.", comment: data });
        } catch (error) {
            console.error("Error adding comment:", error.message);
            res.status(500).json({ error: "Failed to add comment." });
        }
    },

    async deleteComment(req, res) {
        try {
            const commentId = req.params.id;
            const data = await removeComment(commentId, req.userInfo);
            if (data) {
                return res.status(200).json("Comment has been deleted.");
            } else {
                return res.status(403).json("You can delete only your comment.");
            }
        } catch (err) {
            console.error("Error deleting comment:", err.message);
            res.status(500).json({ error: "Failed to delete comment." });
        }
    }
};

export default commentController;
