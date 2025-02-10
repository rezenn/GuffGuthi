import express from "express";
import userController from "../controllers/userController.js";
import profileUpload from "../middleware/UserMulter.js";

const router = express.Router();

// Get user profile
router.get("/:email", userController.getProfile);

// Update user profile (all fields in a single request)
router.put(
    "/:email",
    profileUpload.fields([
        { name: "profilePic", maxCount: 1 },
        { name: "coverPhoto", maxCount: 1 },
    ]),
    userController.updateProfile
);

export default router;