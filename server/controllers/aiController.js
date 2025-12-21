import Resume from "../models/Resume.js";
import { improveSummary, improveBullets } from "../utils/aiImprover.js";

export const improveResumeAI = async (req, res) => {
  try {
    const { resumeId } = req.body;

    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // ✨ Improve summary
    resume.summary = improveSummary(resume.summary);

    // ✨ Improve experience bullets
    resume.experience = resume.experience.map(exp => ({
      ...exp,
      bullets: improveBullets(exp.description || ""),
    }));

    // ✨ Improve project bullets
    resume.projects = resume.projects.map(proj => ({
      ...proj,
      bullets: improveBullets(proj.description || ""),
    }));

    await resume.save();

    res.json({
      message: "Resume improved using AI ✨",
      resume,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI improvement failed" });
  }
};
