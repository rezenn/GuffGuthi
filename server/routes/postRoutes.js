import express from "express";
import { getPosts, addPost, deletePost } from "../controllers/postController.js";
import postMiddleware from "../middleware/postMiddleware.js";
const router = express.Router();

router.get("/", postMiddleware, getPosts);
router.post("/", postMiddleware, addPost);
router.delete("/:id", postMiddleware, deletePost);

export default router;
