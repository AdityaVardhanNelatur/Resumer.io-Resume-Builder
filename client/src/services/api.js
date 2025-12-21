import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔐 Attach JWT automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* =======================
   AUTH APIs ✅ (REQUIRED)
======================= */

// 🔑 Login
export const loginUser = (data) =>
  API.post("/auth/login", data);

// 🆕 Signup
export const signupUser = (data) =>
  API.post("/auth/signup", data);

/* =======================
   RESUME APIs
======================= */

// Create resume
export const saveResume = (resume) =>
  API.post("/resumes", resume);

// Get all resumes
export const getMyResumes = () =>
  API.get("/resumes");

// Update resume
export const updateResume = (id, resume) =>
  API.put(`/resumes/${id}`, resume);

// Delete resume
export const deleteResume = (id) =>
  API.delete(`/resumes/${id}`);

/* =======================
   AI API (OPTIONAL)
======================= */

export const improveResumeAI = (resumeId) =>
  API.post("/ai/improve", { resumeId });

/* =======================
   UPLOAD RESUME
======================= */

export const uploadResume = (formData) =>
  API.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export default API;
