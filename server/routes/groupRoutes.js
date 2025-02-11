import express from "express";
import groupController from "../controllers/groupController.js";
import GroupMulter from "../middleware/GroupMulter.js"; // Middleware for handling file uploads
import postMiddleware from "../middleware/postMiddleware.js";

const router = express.Router();

router.get("/:group_id",postMiddleware, groupController.getGroup);

router.get("/", groupController.getAllGroups);

router.put("/:group_id", GroupMulter.fields([
    { name: "group_logo", maxCount: 1 },
    { name: "group_cover", maxCount: 1 },
]), groupController.updateGroup);

router.post("/", GroupMulter.fields([
    { name: "group_logo", maxCount: 1 },
    { name: "group_cover", maxCount: 1 },
]),postMiddleware, groupController.createGroup);

export default router;
