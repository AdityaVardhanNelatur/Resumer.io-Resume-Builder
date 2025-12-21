import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { uploadResume } from "../controllers/uploadController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

export default router;
