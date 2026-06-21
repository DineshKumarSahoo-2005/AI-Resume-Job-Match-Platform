import { applyForJob } from "../services/applicationService";

function TopJobMatches({ matches }) {
  const handleApply = async (jobId) => {
    try {
      await applyForJob(jobId);

      alert("Applied Successfully ✅");
    } catch (error) {
      alert(error.response?.data?.message || "Application Failed");
    }
  };
  return (
    <section
      className="
      mt-8
    bg-white
dark:bg-white/5
      backdrop-blur-xl
      border
      border-white/10
      rounded-3xl
      p-6
    "
    >
      <h2 className="text-2xl font-bold mb-6">💼 Top Job Matches</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {matches.slice(0, 3).map((job, index) => (
          <div
            key={index}
            className="
            bg-white
dark:bg-white/5
border
border-slate-200
dark:border-white/10
            rounded-2xl
            p-5
            hover:scale-105
            transition
            text-slate-900
dark:text-white
          "
          >
            <h3 className="text-xl font-bold">{job.title}</h3>

            <p className="text-slate-400 mt-1">{job.company}</p>

            <div className="mt-4">
              <span
                className="
    px-3
    py-1
    rounded-full
    bg-green-500/20
    text-green-400
  "
              >
                Match {job.matchScore}%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500">Missing Skills:</p>

              <div className="flex flex-wrap gap-2 mt-2">
                {job.missingSkills?.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="
          px-2
          py-1
          rounded-lg
          text-xs
          bg-red-100
          text-red-600
        "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => handleApply(job.jobId)}
              className="
              cursor-pointer
  mt-5
  w-full
  bg-gradient-to-r
  from-purple-600
  to-blue-600
  py-3
  rounded-xl
  font-semibold
"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopJobMatches;
