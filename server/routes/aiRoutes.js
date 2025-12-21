import express from "express";
import { improveResumeAI } from "../controllers/aiController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/improve", authMiddleware, improveResumeAI);

export default router;
