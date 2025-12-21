import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      default: "My Resume"
    },

    // ✅ ADD THESE (CRITICAL)
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    summary: String,

    skills: [String],

  experience: [
  {
    role: String,
    company: String,
    duration: String,
    bullets: [String]   // ✅ REQUIRED
  }
],

projects: [
  {
    title: String,
    technologies: String,
    bullets: [String]   // ✅ REQUIRED
  }
],

    education: [
      {
        degree: String,
        institution: String,
        year: String
      }
    ],

    certifications: [String]
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
