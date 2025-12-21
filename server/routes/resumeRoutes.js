import express from "express";
import {
  createResume,
  getMyResumes,
  updateResume,
  deleteResume
} from "../controllers/resumeController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createResume);
router.get("/", authMiddleware, getMyResumes);
router.put("/:id", authMiddleware, updateResume);
router.delete("/:id", authMiddleware, deleteResume);

export default router;
