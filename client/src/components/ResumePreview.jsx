import { forwardRef } from "react";

const ResumePreview = forwardRef(({ resume }, ref) => {
  return (
    <div
      ref={ref}
      className="bg-white p-8 rounded-lg shadow w-full text-gray-800"
      style={{
        pageBreakInside: "avoid",
      }}
    >
      {/* NAME */}
      <h1 className="text-4xl font-bold text-center mb-1">
        {resume.name || "Your Name"}
      </h1>

      <p className="text-center text-gray-600 mb-6">
        {resume.email || "your@email.com"}
      </p>

      {/* SUMMARY */}
      <section style={{ pageBreakInside: "avoid" }}>
        <h2 className="text-xl font-semibold mt-6 mb-2">Summary</h2>
        <p>{resume.summary || "Summary will appear here"}</p>
      </section>

      {/* SKILLS */}
      {resume.skills?.length > 0 && (
        <section style={{ pageBreakInside: "avoid" }}>
          <h2 className="text-xl font-semibold mt-6 mb-2">Skills</h2>
          <ul className="list-disc pl-6">
            {resume.skills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
      )}

      {/* CERTIFICATIONS */}
      {resume.certifications?.length > 0 && (
        <section style={{ pageBreakInside: "avoid" }}>
          <h2 className="text-xl font-semibold mt-6 mb-2">Certifications</h2>
          <ul className="list-disc pl-6">
            {resume.certifications.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </section>
      )}

      {/* EXPERIENCE */}
      {resume.experience?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mt-6 mb-2">
            Work Experience
          </h2>

          {resume.experience.map((exp, i) => (
            <div
              key={i}
              className="mb-4"
              style={{ pageBreakInside: "avoid" }}
            >
              <p className="font-semibold">
                {exp.role}
                {exp.company && ` – ${exp.company}`}
              </p>

              {exp.duration && (
                <p className="text-sm text-gray-600">{exp.duration}</p>
              )}

              {exp.bullets?.length > 0 ? (
                <ul className="list-disc pl-6">
                  {exp.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              ) : (
                exp.description && <p>{exp.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* PROJECTS */}
      {resume.projects?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mt-6 mb-2">Projects</h2>

          {resume.projects.map((proj, i) => (
            <div
              key={i}
              className="mb-4"
              style={{ pageBreakInside: "avoid" }}
            >
              <p className="font-semibold">{proj.title}</p>

              {proj.bullets?.length > 0 ? (
                <ul className="list-disc pl-6">
                  {proj.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              ) : (
                proj.description && <p>{proj.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* EDUCATION */}
      {resume.education?.length > 0 && (
        <section style={{ pageBreakInside: "avoid" }}>
          <h2 className="text-xl font-semibold mt-6 mb-2">Education</h2>
          {resume.education.map((edu, i) => (
            <p key={i} className="font-semibold">
              {edu.degree}
              {edu.institution && ` – ${edu.institution}`}
              {edu.year && ` (${edu.year})`}
            </p>
          ))}
        </section>
      )}
    </div>
  );
});

export default ResumePreview;
