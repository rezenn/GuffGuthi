import express from "express";
import { getUser } from "../controllers/userController.js";

const router = express.Router();

// Route to get the user's profile
router.get("/profile", getUser);

export default router;
