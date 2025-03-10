import express from "express";
import postController from "../controllers/postController.js"
import postMiddleware from "../middleware/postMiddleware.js";
import upload from "../middleware/ImageMulter.js";

const router = express.Router();

router.get("/", postMiddleware, postController.getPosts);
router.get("/loggedIn",postMiddleware, postController.getLoggedInPosts);
router.get("/user/:userId", postController.getUserPosts);
router.post("/", postMiddleware, upload.single("image"), postController.addPost);
router.delete("/:id", postMiddleware, postController.deletePost);

export default router;
