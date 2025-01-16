import express from "express";
import validation from "../middleware/validations_middleware.js";
import authorization from "../middleware/auth_middleware.js";
import { registerUser, loginUser, verifyUser } from "../controllers/authController.js";

const router = express.Router();

// Routes
router.post("/register", validation, registerUser);
router.post("/login", validation, loginUser);
router.get("/verifyed", authorization, verifyUser);

export default router;
