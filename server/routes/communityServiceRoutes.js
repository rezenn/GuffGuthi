import { Router } from "express";
import { fetchAllRequests, fetchRequestById, createNewRequest } from "../controllers/communityServiceController.js";

const router = Router();

router.get("/requests", fetchAllRequests);
router.get("/requests/:id", fetchRequestById);
router.post("/requests", createNewRequest);

export default router;
