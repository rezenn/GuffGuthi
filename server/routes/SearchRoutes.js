import express from "express";
import SearchController from "../controllers/SearchController.js";

const router = express.Router();

// Search route to handle GET requests for search queries
router.get("/", SearchController.search);

export default router;