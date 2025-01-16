import express from "express";
import { getPosts, addPost, deletePost } from "../controllers/postController.js";
import authorize from "../middleware/auth_middleware.js";

const router = express.Router();

router.get("/", authorize, getPosts);
router.post("/", authorize, addPost);
router.delete("/:id", authorize, deletePost);

export default router;
