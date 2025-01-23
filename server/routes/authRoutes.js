import express from "express";
import validation from "../middleware/validations_middleware.js";
import authorization from "../middleware/auth_middleware.js";
import { registerUser, loginUser, verifyUser, forgotPassword } from "../controllers/authController.js";

const router = express.Router();

// Routes
router.post("/register", validation, registerUser);
router.post("/login", validation, loginUser);
router.post("/forgotPassword", validation, forgotPassword);
router.get("/verifyed", authorization, verifyUser);

export default router;
