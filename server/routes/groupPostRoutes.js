import express from "express";
import groupPostController from "../controllers/groupPostcontroller.js"
import postMiddleware from "../middleware/postMiddleware.js";
import upload from "../middleware/groupPostMulter.js";

const router = express.Router();

router.get("/:group_id", postMiddleware, groupPostController.getPosts);
router.post("/:group_id", postMiddleware, upload.single("image"), groupPostController.addPost);
router.delete("/:group_id/:id", postMiddleware, groupPostController.deletePost);

export default router;
