import express from "express";
import { getUserInfo } from "../controllers/homeController.js";
import authorize from "../middleware/auth_middleware.js";

const router = express.Router();

// Route to get user information
router.get("/", authorize, getUserInfo);

export default router;
