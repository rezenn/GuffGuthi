import express from "express";
import userController from "../controllers/userController.js";
import profileUpload from "../middleware/UserMulter.js";

const router = express.Router();

// Get user profile
router.get("/:email", userController.getProfile);
router.get("/profile/:userId", userController.getUser);
router.get("/userMessage", userController.userMessage);
router.get("/", userController.getAllUser);


router.put(
    "/:email",
    profileUpload.fields([
        { name: "profilePic", maxCount: 1 },
        { name: "coverPhoto", maxCount: 1 },
    ]),
    userController.updateProfile
);

export default router;