export const parseResumeText = (text) => {
  const lines = text
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  let currentSection = "";
  const data = {
    name: "",
    email: "",
    phone: "",
    summary: "",
    skills: [],
    experience: [],
    projects: [],
    education: [],
    certifications: []
  };

  // ---------- BASIC INFO ----------
  data.name = lines[0] || "";
  data.email = lines.find(l => l.includes("@")) || "";
  data.phone = lines.find(l => l.match(/\+?\d[\d\s-]{8,}/)) || "";

  // ---------- SECTION PARSING ----------
  let buffer = [];

  const flushSection = () => {
    const content = buffer.join(" ").trim();

    if (!content) return;

    switch (currentSection) {
      case "summary":
        data.summary = content;
        break;

      case "skills":
        data.skills = content.split(",").map(s => s.trim());
        break;

      case "certifications":
        data.certifications = buffer;
        break;
    }

    buffer = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();

    // SECTION HEADERS
    if (line === "summary") {
      flushSection();
      currentSection = "summary";
      continue;
    }

    if (line === "skills") {
      flushSection();
      currentSection = "skills";
      continue;
    }

    if (line === "work experience") {
      flushSection();
      currentSection = "experience";
      continue;
    }

    if (line === "projects") {
      flushSection();
      currentSection = "projects";
      continue;
    }

    if (line === "education") {
      flushSection();
      currentSection = "education";
      continue;
    }

    if (line === "certifications") {
      flushSection();
      currentSection = "certifications";
      continue;
    }

    // ---------- EXPERIENCE ----------
    if (currentSection === "experience") {
      if (lines[i + 1]?.match(/–|-/)) {
        const [role, company] = lines[i].split("–").map(s => s.trim());
        const duration = lines[i + 1];
        const bullets = [];

        let j = i + 2;
        while (lines[j]?.startsWith("•")) {
          bullets.push(lines[j].replace("•", "").trim());
          j++;
        }

        data.experience.push({ role, company, duration, bullets });
        i = j - 1;
        continue;
      }
    }

    // ---------- PROJECTS ----------
    if (currentSection === "projects") {
      const title = lines[i];
      const bullets = [];

      let j = i + 1;
      while (lines[j]?.startsWith("•")) {
        bullets.push(lines[j].replace("•", "").trim());
        j++;
      }

      data.projects.push({ title, bullets });
      i = j - 1;
      continue;
    }

    // ---------- EDUCATION ----------
    if (currentSection === "education") {
      const match = lines[i].match(/(.+) – (.+) \((.+)\)/);
      if (match) {
        data.education.push({
          degree: match[1],
          institution: match[2],
          year: match[3]
        });
      }
      continue;
    }

    buffer.push(lines[i]);
  }

  flushSection();
  return data;
};
