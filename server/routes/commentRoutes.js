import express from "express";
import commentController from "../controllers/commentController.js";
import postMiddleware from "../middleware/postMiddleware.js";

const router = express.Router();

router.get("/", postMiddleware, commentController.getComments);
router.post("/", postMiddleware, commentController.addComment);
router.delete("/:id", postMiddleware, commentController.deleteComment);

export default router;