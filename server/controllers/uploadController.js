import mammoth from "mammoth";
import Resume from "../models/Resume.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

// 🔹 PASTE basicParse HERE 👇
function basicParse(text) {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

  let name = lines[0] || "";
  let email = "";
  let summary = "";
  let skills = [];
  let education = [];
  let experience = [];
  let projects = [];

  const emailMatch = text.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/
  );
  if (emailMatch) email = emailMatch[0];

  let currentSection = "";

  lines.forEach((line) => {
    const lower = line.toLowerCase();

    if (lower.includes("summary")) currentSection = "summary";
    else if (lower.includes("skills")) currentSection = "skills";
    else if (lower.includes("work experience")) currentSection = "experience";
    else if (lower.includes("projects")) currentSection = "projects";
    else if (lower.includes("education")) currentSection = "education";
    else {
      switch (currentSection) {
        case "summary":
          summary += line + " ";
          break;

        case "skills":
          skills = line.split(",").map(s => s.trim());
          break;

        case "experience":
  // NEW role line (NO verbs, NO bullets)
  if (
    !line.startsWith("•") &&
    !/^(developed|worked|built|implemented)/i.test(line)
  ) {
    experience.push({
      role: line,
      company: "",
      duration: "",
      description: "",
      bullets: []
    });
  }
  // Description lines
  else if (experience.length > 0) {
    experience[experience.length - 1].description +=
      line.replace(/^•/,"").trim() + ". ";
  }
  break;

  case "projects":
  // New project title (only if line is NOT a verb sentence)
  if (
    !line.startsWith("•") &&
    /^[A-Z]/.test(line) &&                      // starts with capital
    !/^(developed|worked|built|implemented|added)/i.test(line)
  ) {
    projects.push({
      title: line,
      description: "",
      bullets: []
    });
  }
  // Description lines → attach to LAST project
  else if (projects.length > 0) {
    projects[projects.length - 1].description +=
      line.replace(/^•/,"").trim() + ". ";
  }
  break;

        case "education":
          education.push({
            degree: line,
            institution: "",
            year: ""
          });
          break;

        default:
          break;
      }
    }
  });

  return {
    name,
    email,
    summary: summary.trim(),
    skills,
    experience,
    projects,
    education,
    certifications: []
  };
}

// 🔹 EXISTING CONTROLLER (NO CHANGE NEEDED BELOW)
export const uploadResume = async (req, res) => {
  try {
    let extractedText = "";

    if (req.file.mimetype === "application/pdf") {
      const data = await pdfParse(req.file.buffer);
      extractedText = data.text;
    } else if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({
        buffer: req.file.buffer,
      });
      extractedText = result.value;
    }

    const parsed = basicParse(extractedText);

    const resume = await Resume.create({
      userId: req.user.id,
      title: parsed.name || "Uploaded Resume",
      name: parsed.name,
      email: parsed.email,
      summary: parsed.summary,
      skills: parsed.skills,
      experience: parsed.experience,
      projects: parsed.projects,
      education: parsed.education,
      certifications: parsed.certifications,
    });

    res.status(201).json({
      message: "Resume uploaded & parsed successfully",
      resumeId: resume._id,
      parsed,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resume upload failed" });
  }
};
