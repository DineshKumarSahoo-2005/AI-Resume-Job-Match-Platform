import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyJobs, deleteJob } from "../services/jobPostService";
import RecruiterLayout from "../layouts/RecruiterLayout";

function MyJobs() {
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getMyJobs();
      setJobs(data.jobs);
    } catch (error) {
      return;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);

      fetchJobs();

      alert("Job Deleted ✅");
    } catch (error) {
      alert("Delete Failed ❌");
    }
  };

  return (
    <RecruiterLayout>
      <h1 className="text-4xl font-bold mb-8">📋 My Jobs</h1>

      <div className="space-y-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="
  bg-white
  dark:bg-white/5
  border
  border-white/10
  rounded-3xl
  p-6
  shadow-lg
  hover:shadow-2xl
  hover:-translate-y-1
  transition-all
  duration-300
"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">💼 {job.title}</h2>

                <p className="text-slate-500 mt-1">🏢 {job.company}</p>
              </div>

              <span
                className="
    bg-green-500/10
    text-green-600
    px-4
    py-2
    rounded-full
    text-sm
    font-semibold
    "
              >
                Active
              </span>
            </div>

            <p className="mt-5 text-slate-600 line-clamp-3">
              {job.description}
            </p>

            <div className="mt-5">
              <h3 className="font-semibold mb-2">Required Skills</h3>

              <div className="flex flex-wrap gap-2">
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.skillsRequired.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-5">
                <p className="text-sm text-slate-500">
                  📅 Posted on {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={() => navigate(`/candidates/${job._id}`)}
                className="
    bg-green-600
    hover:bg-green-700
    text-white
    px-5
    py-2
    rounded-xl
    "
              >
                👥 View Candidates
              </button>

              <button
                onClick={() => navigate(`/edit-job/${job._id}`)}
                className="
    bg-blue-600
    hover:bg-blue-700
    text-white
    px-5
    py-2
    rounded-xl
    "
              >
                ✏ Edit
              </button>

              <button
                onClick={() => handleDelete(job._id)}
                className="
    bg-red-500
    hover:bg-red-600
    text-white
    px-5
    py-2
    rounded-xl
    "
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </RecruiterLayout>
  );
}

export default MyJobs;
