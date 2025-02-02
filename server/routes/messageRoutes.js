import express from "express";
import auth_middleware from "../middleware/postMiddleware.js";

import {
    getMessages,
    getUsersForSidebarController as getUsersForSidebar,
    sendMessage
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/conversations", auth_middleware, getUsersForSidebar);
router.get("/:id", auth_middleware, getMessages);
router.post("/send/:id", auth_middleware, sendMessage);


export default router;
