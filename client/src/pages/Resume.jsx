import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyResume } from "../services/resumeInfoService";
import CandidateLayout from "../layouts/CandidateLayout";

function Resume() {
  const [resume, setResume] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const data = await getMyResume();
      setResume(data.resume);
    } catch (error) {
      return;
    }
  };

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">No Resume Found</h2>
      </div>
    );
  }

  const resumeUrl = `http://localhost:5000/${resume.filePath}`;

  return (
    <CandidateLayout>
      <div
        className="
max-w-7xl
mx-auto

bg-white/5
backdrop-blur-md

border
border-white/10

rounded-3xl
p-8
"
      >
        {/* Header */}
        <div className="mb-10">
          <h1
            className="
text-5xl
font-bold
dark:text-white
"
          >
            📄 Resume
          </h1>

          <p
            className="
text-slate-400
mt-2
"
          >
            Manage and preview your uploaded resume
          </p>
        </div>

        {/* Resume Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div
            className="
bg-green-500/10
border
border-green-500/20
rounded-3xl
p-6
"
          >
            <p className="text-slate-400">Resume Status</p>

            <h2
              className="
text-4xl
font-bold
text-green-400
mt-2
"
            >
              Uploaded
            </h2>
          </div>

          <div
            className="
bg-blue-500/10
border
border-blue-500/20
rounded-3xl
p-6
"
          >
            <p className="text-slate-400">Skills Extracted</p>

            <h2
              className="
text-4xl
font-bold
text-blue-400
mt-2
"
            >
              {resume.skills.length}
            </h2>
          </div>

          <div
            className="
bg-purple-500/10
border
border-purple-500/20
rounded-3xl
p-6
"
          >
            <p className="text-slate-400">Resume Count</p>

            <h2
              className="
text-4xl
font-bold
text-purple-400
mt-2
"
            >
              1
            </h2>
          </div>
        </div>

        {/* Resume Information */}
        <div
          className="
bg-white/5
border
border-white/10
rounded-3xl
p-6
mb-8
"
        >
          <h2
            className="
text-2xl
font-bold
mb-5
dark:text-white
"
          >
            📋 Resume Information
          </h2>

          <div className="space-y-3">
            <p>
              <strong>File Name:</strong> {resume.originalName}
            </p>

            <p>
              <strong>Upload Date:</strong>{" "}
              {new Date(resume.createdAt).toLocaleDateString()}
            </p>

            <p>
              <strong>Status:</strong> Uploaded ✅
            </p>
          </div>

          <a
            href={`http://localhost:5000/api/resume/download/${resume._id}`}
            download
            className="
inline-flex
items-center
gap-2

mt-5

bg-gradient-to-r
from-blue-600
to-purple-600

hover:scale-105

transition

text-white

px-6
py-3

rounded-xl
"
          >
            ⬇ Download Resume
          </a>
        </div>

        {/* Skills Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Skills Extracted</h2>

          <div className="flex flex-wrap gap-3">
            {resume.skills.map((skill, index) => (
              <span
                key={index}
                className="
bg-blue-500/10
text-blue-400

border
border-blue-500/20

px-4
py-2

rounded-full

font-medium
"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Resume Preview */}
        <div
          className="
bg-white/5
border
border-white/10

rounded-3xl
p-6
"
        >
          <h2 className="text-2xl font-bold mb-5">Resume Preview</h2>

          <iframe
            src={resumeUrl}
            width="100%"
            height="700"
            title="Resume Preview"
            className="
rounded-2xl
border
border-white/10
"
          />
        </div>
      </div>
    </CandidateLayout>
  );
}

export default Resume;
