import { useState } from "react";
import { uploadResume } from "../services/resumeService";

function Dashboard() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const handleUpload = async () => {
    if (!file) {
      return alert("Select Resume");
    }
    try {
      await uploadResume(file);
      setMessage("Resume Uploaded Successfully ✅");
    } catch (error) {
      setMessage("Upload Failed ❌");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-white shadow px-8 py-4 flex justify-between">
        <h1 className="text-2xl font-bold">HireSense AI 🚀</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            onClick={handleUpload}
            className="block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Upload Resume
          </button>
          {message && <p className="mt-4 font-medium">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
