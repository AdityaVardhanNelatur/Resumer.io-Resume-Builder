import { useState } from "react";

const ResumeForm = ({ resume, setResume }) => {
  const [skillInput, setSkillInput] = useState("");
  const [certInput, setCertInput] = useState("");

  const addItem = (field, value, setter) => {
    if (!value.trim()) return;
    setResume({ ...resume, [field]: [...resume[field], value] });
    setter("");
  };

  const removeItem = (field, index) => {
    setResume({
      ...resume,
      [field]: resume[field].filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-8">

      {/* NAME */}
      <input
        value={resume.name}
        onChange={(e) => setResume({ ...resume, name: e.target.value })}
        placeholder="Full Name"
        className="w-full p-2 border rounded"
      />

      {/* EMAIL */}
      <input
        value={resume.email}
        onChange={(e) => setResume({ ...resume, email: e.target.value })}
        placeholder="Email"
        className="w-full p-2 border rounded"
      />

      {/* SUMMARY */}
      <div>
        <h3 className="font-semibold mb-2">Summary</h3>
        <textarea
          value={resume.summary}
          onChange={(e) =>
            setResume({ ...resume, summary: e.target.value })
          }
          className="w-full p-2 border rounded"
          rows="4"
          placeholder="Professional summary"
        />
      </div>

      {/* SKILLS */}
      <div>
        <h3 className="font-semibold mb-2">Skills</h3>
        <div className="flex gap-2">
          <input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Add skill"
          />
          <button
            onClick={() => addItem("skills", skillInput, setSkillInput)}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {resume.skills.map((s, i) => (
            <span
              key={i}
              className="bg-gray-200 px-3 py-1 rounded-full text-sm cursor-pointer"
              onClick={() => removeItem("skills", i)}
            >
              {s} ❌
            </span>
          ))}
        </div>
      </div>

      {/* CERTIFICATIONS */}
      <div>
        <h3 className="font-semibold mb-2">Certifications</h3>
        <div className="flex gap-2">
          <input
            value={certInput}
            onChange={(e) => setCertInput(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Add certification"
          />
          <button
            onClick={() =>
              addItem("certifications", certInput, setCertInput)
            }
            className="bg-blue-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        <ul className="list-disc pl-5 mt-2">
          {resume.certifications.map((c, i) => (
            <li
              key={i}
              className="cursor-pointer"
              onClick={() => removeItem("certifications", i)}
            >
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* WORK EXPERIENCE */}
      <div>
        <h3 className="font-semibold mb-2">Work Experience</h3>

        {resume.experience.map((exp, index) => (
          <div key={index} className="border p-3 mb-3 rounded space-y-2">
            <input
              placeholder="Role"
              value={exp.role}
              onChange={(e) => {
                const updated = [...resume.experience];
                updated[index].role = e.target.value;
                setResume({ ...resume, experience: updated });
              }}
              className="w-full p-2 border rounded"
            />

            <input
              placeholder="Company"
              value={exp.company}
              onChange={(e) => {
                const updated = [...resume.experience];
                updated[index].company = e.target.value;
                setResume({ ...resume, experience: updated });
              }}
              className="w-full p-2 border rounded"
            />

            <input
              placeholder="Duration (e.g. 2022 – 2024)"
              value={exp.duration}
              onChange={(e) => {
                const updated = [...resume.experience];
                updated[index].duration = e.target.value;
                setResume({ ...resume, experience: updated });
              }}
              className="w-full p-2 border rounded"
            />

            {/* BULLET INPUT */}
            <input
              placeholder="Add experience bullet and press Enter"
              className="w-full p-2 border rounded"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (!e.target.value.trim()) return;

                  const updated = [...resume.experience];
                  updated[index].bullets = [
                    ...(updated[index].bullets || []),
                    e.target.value
                  ];

                  setResume({ ...resume, experience: updated });
                  e.target.value = "";
                }
              }}
            />

            <ul className="list-disc pl-6">
              {exp.bullets?.map((b, i) => (
                <li key={i} className="text-sm">{b}</li>
              ))}
            </ul>

            <button
              onClick={() =>
                setResume({
                  ...resume,
                  experience: resume.experience.filter((_, i) => i !== index)
                })
              }
              className="text-red-500"
            >
              Remove Experience
            </button>
          </div>
        ))}

        <button
          onClick={() =>
            setResume({
              ...resume,
              experience: [
                ...resume.experience,
                { role: "", company: "", duration: "", bullets: [] }
              ]
            })
          }
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          + Add Experience
        </button>
      </div>

      {/* PROJECTS */}
      <div>
        <h3 className="font-semibold mb-2">Projects</h3>

        {resume.projects.map((proj, index) => (
          <div key={index} className="border p-3 mb-3 rounded space-y-2">
            <input
              placeholder="Project Title"
              value={proj.title}
              onChange={(e) => {
                const updated = [...resume.projects];
                updated[index].title = e.target.value;
                setResume({ ...resume, projects: updated });
              }}
              className="w-full p-2 border rounded"
            />

            <input
              placeholder="Technologies (React, Node, MongoDB)"
              value={proj.technologies || ""}
              onChange={(e) => {
                const updated = [...resume.projects];
                updated[index].technologies = e.target.value;
                setResume({ ...resume, projects: updated });
              }}
              className="w-full p-2 border rounded"
            />

            {/* BULLET INPUT */}
            <input
              placeholder="Add project bullet and press Enter"
              className="w-full p-2 border rounded"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (!e.target.value.trim()) return;

                  const updated = [...resume.projects];
                  updated[index].bullets = [
                    ...(updated[index].bullets || []),
                    e.target.value
                  ];

                  setResume({ ...resume, projects: updated });
                  e.target.value = "";
                }
              }}
            />

            <ul className="list-disc pl-6">
              {proj.bullets?.map((b, i) => (
                <li key={i} className="text-sm">{b}</li>
              ))}
            </ul>

            <button
              onClick={() =>
                setResume({
                  ...resume,
                  projects: resume.projects.filter((_, i) => i !== index)
                })
              }
              className="text-red-500"
            >
              Remove Project
            </button>
          </div>
        ))}

        <button
          onClick={() =>
            setResume({
              ...resume,
              projects: [
                ...resume.projects,
                { title: "", technologies: "", bullets: [] }
              ]
            })
          }
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          + Add Project
        </button>
      </div>

      {/* EDUCATION */}
      <div>
        <h3 className="font-semibold mb-2">Education</h3>

        {resume.education.map((edu, index) => (
          <div key={index} className="border p-3 mb-3 rounded">
            <input
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => {
                const updated = [...resume.education];
                updated[index].degree = e.target.value;
                setResume({ ...resume, education: updated });
              }}
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => {
                const updated = [...resume.education];
                updated[index].institution = e.target.value;
                setResume({ ...resume, education: updated });
              }}
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              placeholder="Year"
              value={edu.year}
              onChange={(e) => {
                const updated = [...resume.education];
                updated[index].year = e.target.value;
                setResume({ ...resume, education: updated });
              }}
              className="w-full p-2 border rounded"
            />

            <button
              onClick={() =>
                setResume({
                  ...resume,
                  education: resume.education.filter((_, i) => i !== index)
                })
              }
              className="text-red-500 mt-2"
            >
              Remove Education
            </button>
          </div>
        ))}

        <button
          onClick={() =>
            setResume({
              ...resume,
              education: [
                ...resume.education,
                { degree: "", institution: "", year: "" }
              ]
            })
          }
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          + Add Education
        </button>
      </div>
    </div>
  );
};

export default ResumeForm;
