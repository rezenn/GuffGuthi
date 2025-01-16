const express = require("express");
const router = express.Router();
const { getUserInfo } = require("../controllers/homeController");
const authorize = require("../middleware/auth_middleware");

// Route to get user information
router.get("/", authorize, getUserInfo);

module.exports = router;
