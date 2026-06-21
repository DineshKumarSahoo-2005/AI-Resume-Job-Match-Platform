import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CandidateLayout from "../layouts/CandidateLayout";
import { getJobMatches } from "../services/jobService";
import { applyForJob } from "../services/applicationService";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [skillFilter, setSkillFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getJobMatches();
      setJobs(data.matches);
    } catch (error) {
      return;
    }
  };

  const handleApply = async (jobId) => {
    try {
      const data = await applyForJob(jobId);

      alert("Application Submitted Successfully ✅");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to apply");
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchesSkill =
      skillFilter === "All" ||
      job.matchingSkills?.some(
        (skill) => skill.toLowerCase() === skillFilter.toLowerCase(),
      );

    return matchesSearch && matchesSkill;
  });

  return (
    <CandidateLayout>
      {/* Header */}

      <div className="mb-10">
        <h1 className="text-5xl font-bold dark:text-white">💼 Job Matches</h1>

        <p className="text-slate-600 dark:text-slate-400 mt-2">
          AI-powered recommendations based on your resume skills
        </p>
      </div>

      {/* Search + Filter */}

      <div
        className="
        bg-white
        dark:bg-white/5
        border
        border-slate-200
        dark:border-white/10
        rounded-3xl
        p-6
        shadow-lg
        mb-8
      "
      >
        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="🔍 Search jobs or companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              md:col-span-3
              bg-slate-100
              dark:bg-white/5
              border
              border-slate-200
              dark:border-white/10
              rounded-2xl
              px-5
              py-3
              outline-none
              text-slate-700
              dark:text-white
            "
          />

          <select
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="
    dark:bg-slate-900
    dark:text-white
    border
    dark:border-white/10
    rounded-2xl
    px-4
    py-3
    outline-none
  "
          >
            <option value="All">All Skills</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="Express">Express</option>
            <option value="MongoDB">MongoDB</option>
          </select>
        </div>
      </div>

      {/* Jobs Count */}

      <div className="mb-8">
        <div
          className="
          bg-white
          dark:bg-white/5
          border
          border-slate-200
          dark:border-white/10
          rounded-3xl
          p-6
          shadow-lg
        "
        >
          <p className="text-slate-500">Jobs Found</p>

          <h2 className="text-4xl font-bold text-purple-500 mt-2">
            {filteredJobs.length}
          </h2>
        </div>
      </div>

      {/* Empty State */}

      {filteredJobs.length === 0 ? (
        <div
          className="
          bg-white
          dark:bg-white/5
          border
          border-slate-200
          dark:border-white/10
          rounded-3xl
          p-10
          text-center
          shadow-lg
        "
        >
          <h2 className="text-2xl font-bold">No Jobs Found</h2>

          <p className="text-slate-500 mt-2">
            Try changing your search or skill filter.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.jobId}
              className="
                bg-white
                dark:bg-white/5
                border
                border-slate-200
                dark:border-white/10
                rounded-3xl
                p-6
                shadow-lg
                backdrop-blur-xl
  hover:border-purple-500/40
  hover:-translate-y-1
  transition-all
  duration-300
  flex
  flex-col
  justify-between
  min-h-[320px]
              "
            >
              {/* Header */}

              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold">{job.title}</h2>

                  <p className="text-slate-500 mt-2">🏢 {job.company}</p>
                </div>

                <span
                  className="
                  bg-green-100
                  text-green-700
                  dark:bg-green-500/10
                  dark:text-green-400
                  px-4
                  py-2
                  rounded-full
                  font-semibold
                "
                >
                  {job.matchScore}% Match
                </span>
              </div>

              {/* Matching Skills */}

              <div className="mt-6">
                <h3 className="font-semibold mb-3">✅ Matching Skills</h3>

                <div className="flex flex-wrap gap-2">
                  {job.matchingSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="
                        bg-green-100
                        text-green-700
                        dark:bg-green-500/10
                        dark:text-green-400
                        px-3
                        py-1
                        rounded-full
                      "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}

              <div className="mt-5">
                <h3 className="font-semibold mb-3">❌ Missing Skills</h3>

                <div className="flex flex-wrap gap-2">
                  {job.missingSkills.length > 0 ? (
                    job.missingSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="
                          bg-red-100
                          text-red-700
                          dark:bg-red-500/10
                          dark:text-red-400
                          px-3
                          py-1
                          rounded-full
                        "
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-green-500 font-medium">
                      No missing skills 🎉
                    </span>
                  )}
                </div>
              </div>

              {/* Buttons */}

              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={() => handleApply(job.jobId)}
                  className="
  cursor-pointer
  bg-blue-600
  hover:bg-blue-700
  text-white
  px-5
  py-2
  rounded-xl
"
                >
                  Apply Now
                </button>

                <button
                  onClick={() => navigate(`/interview-questions/${job.jobId}`)}
                  className="
                  cursor-pointer
                  bg-purple-600
                  hover:bg-purple-700
                  text-white
                  px-5
                  py-2
                  rounded-xl
                "
                >
                  🧠 Generate Questions
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </CandidateLayout>
  );
}

export default Jobs;
