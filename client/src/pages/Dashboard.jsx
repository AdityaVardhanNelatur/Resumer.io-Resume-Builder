import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyResumes, deleteResume } from "../services/api";
import ResumeCard from "../components/ResumeCard";
import API from "../services/api";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const res = await getMyResumes();
      setResumes(res.data || []);
    } catch {
      alert("Failed to load resumes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume? This action cannot be undone.")) return;
    try {
      await deleteResume(id);
      fetchResumes();
    } catch {
      alert("Failed to delete resume");
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      await API.post("/upload", formData);
      alert("Resume uploaded successfully ✅");
      fetchResumes();
    } catch {
      alert("Resume upload failed ❌");
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                My Resumes
              </h1>
              <p className="text-gray-600 mt-2">
                Create, manage, and organize your professional resumes
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0">
              {/* Upload Button with icon */}
              <div className="relative group">
                <input
                  type="file"
                  id="uploadResume"
                  className="hidden"
                  onChange={handleUpload}
                  accept=".docx"
                />
                <label
                  htmlFor="uploadResume"
                  className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                  </svg>
                  Upload Resume
                </label>
                <div className="absolute -bottom-8 left-0 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Supports DOCX
                </div>
              </div>
              
              {/* Create Button */}
              <button
                onClick={() => navigate("/editor")}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Create New
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Resumes</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{resumes.length}</p>
                </div>
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Recently Updated</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {resumes.length > 0 ? new Date(resumes[0]?.updatedAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'None'}
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Ready to Share</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{resumes.length}</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Storage</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{resumes.length * 0.5} MB</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Resumes Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : resumes.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-200">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">No resumes yet</h3>
                <p className="text-gray-600 mb-8">Create your first professional resume or upload an existing one to get started</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate("/editor")}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow"
                  >
                    Create Your First Resume
                  </button>
                  <label className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg px-6 py-3 text-gray-700 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleUpload}
                      accept=".pdf,.doc,.docx"
                    />
                    Upload Existing
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">All Resumes ({resumes.length})</h2>
                <div className="flex gap-2">
                  <button className="text-gray-600 hover:text-gray-800 px-3 py-1 text-sm">
                    Sort by: Recent
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumes.map((resume) => (
                  <ResumeCard
                    key={resume._id}
                    resume={resume}
                    onEdit={() => navigate(`/editor/${resume._id}`)}
                    onDelete={() => handleDelete(resume._id)}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* Bottom Pattern */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
              </svg>
              <span>Tip: Keep your resumes updated for better job opportunities</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;