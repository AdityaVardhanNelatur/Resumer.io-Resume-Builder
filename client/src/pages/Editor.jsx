import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import { saveResume, getMyResumes, updateResume } from "../services/api";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

// ✅ FREE RULE-BASED AI
import { improveSummary, improveBullets } from "../utils/aiImprover";
import Navbar from "../components/Navbar";

const Editor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const previewRef = useRef(null);

  const [resume, setResume] = useState({
    title: "My Resume",
    name: "",
    email: "",
    summary: "",
    skills: [],
    certifications: [],
    experience: [],
    projects: [],
    education: [],
  });

  /* =========================
     LOAD RESUME
  ========================== */
  useEffect(() => {
    if (isEditMode) loadResume();
    // eslint-disable-next-line
  }, [id]);

  const loadResume = async () => {
    try {
      const res = await getMyResumes();
      const found = res.data.find(r => r._id === id);
      if (!found) return navigate("/dashboard");
      setResume(found);
    } catch {
      alert("Failed to load resume");
    }
  };

  /* =========================
     SAVE
  ========================== */
  const handleSave = async () => {
    try {
      if (isEditMode) await updateResume(id, resume);
      else await saveResume(resume);

      alert("Resume saved successfully ✅");
      navigate("/dashboard");
    } catch {
      alert("Failed to save resume ❌");
    }
  };

  /* =========================
     AI IMPROVE
  ========================== */
  const handleAIImprove = () => {
    setResume(prev => ({
      ...prev,
      summary: improveSummary(prev.summary),

      experience: prev.experience.map(exp => ({
        ...exp,
        bullets:
          exp.bullets?.length > 0
            ? exp.bullets
            : improveBullets(exp.description || exp.role || ""),
        description: ""
      })),

      projects: prev.projects.map(proj => ({
        ...proj,
        bullets:
          proj.bullets?.length > 0
            ? proj.bullets
            : improveBullets(proj.description || proj.title || ""),
        description: ""
      }))
    }));

    alert("✨ Resume improved using AI");
  };

  /* =========================
     DOWNLOAD PDF (FIXED)
  ========================== */
  const handleDownload = async () => {
    if (!previewRef.current) return;

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${resume.name || "resume"}.pdf`);
    } catch (err) {
      console.error(err);
      alert("PDF download failed ❌");
    }
  };

  /* =========================
     UI
  ========================== */
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">
        {/* HEADER */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
          <h1 className="text-2xl font-bold">
            {isEditMode ? "Edit Resume" : "Create Resume"}
          </h1>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleAIImprove}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded shadow hover:scale-105 transition"
            >
              ✨ Improve with AI
            </button>

            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded shadow"
            >
              💾 Save
            </button>

            <button
              onClick={handleDownload}
              className="bg-purple-600 text-white px-6 py-2 rounded shadow"
            >
              📄 Download PDF
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded shadow">
            <ResumeForm resume={resume} setResume={setResume} />
          </div>

          <div className="bg-white p-4 rounded shadow overflow-auto">
            <ResumePreview ref={previewRef} resume={resume} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
