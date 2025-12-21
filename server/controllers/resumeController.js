import Resume from "../models/Resume.js";

/**
 * CREATE RESUME
 */
export const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      userId: req.user.id,   // comes from JWT middleware
      ...req.body
    });

    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: "Failed to create resume" });
  }
};

/**
 * GET MY RESUMES
 */
export const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch resumes" });
  }
};

/**
 * UPDATE RESUME
 */
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: "Failed to update resume" });
  }
};

/**
 * DELETE RESUME
 */
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete resume" });
  }
};
