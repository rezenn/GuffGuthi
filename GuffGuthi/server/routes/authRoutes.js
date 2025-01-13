const express = require("express");
const router = express.Router();
const validation = require("../middleware/validations_middleware");
const authorization = require("../middleware/auth_middleware");
const authController = require("../controllers/authController");

router.post("/register", validation, authController.registerUser);
router.post("/login", validation, authController.loginUser);
router.get("/verifyed", authorization, authController.verifyUser);

module.exports = router;