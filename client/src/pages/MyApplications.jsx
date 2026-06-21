import { useEffect, useState } from "react";
import { getMyApplications } from "../services/applicationService";
import CandidateLayout from "../layouts/CandidateLayout";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await getMyApplications();
      setApplications(data.applications);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Selected":
        return "bg-green-500/10 text-green-500";

      case "Rejected":
        return "bg-red-500/10 text-red-500";

      case "Scheduled":
        return "bg-blue-500/10 text-blue-500";

      default:
        return "bg-yellow-500/10 text-yellow-500";
    }
  };

  if (loading) {
    return (
      <CandidateLayout>
        <div className="flex justify-center items-center py-40">
          <h1 className="text-3xl font-bold">Loading Applications...</h1>
        </div>
      </CandidateLayout>
    );
  }

  return (
    <CandidateLayout>
      {/* Hero */}
      <div
        className="
        mb-8
        p-6
        rounded-3xl
        bg-white
        dark:bg-white/5
        border
        border-slate-200
        dark:border-white/10
        shadow-lg
        dark:shadow-none
      "
      >
        <h1 className="text-5xl font-bold">📄 My Applications</h1>

        <p className="text-slate-500 mt-3">
          Track all your job applications in one place.
        </p>

        <div className="flex gap-6 mt-5 text-slate-500">
          <div>📄 {applications.length} Applied</div>

          <div>
            ⏳ {applications.filter((app) => app.status === "Applied").length}{" "}
            Pending
          </div>

          <div>
            🎉 {applications.filter((app) => app.status === "Selected").length}{" "}
            Selected
          </div>
        </div>

        <div className="mt-5">
          <span
            className="
            px-4
            py-2
            rounded-xl
            bg-purple-500/10
            text-purple-500
            font-medium
          "
          >
            {applications.length} Applications
          </span>
        </div>
      </div>

      {/* Empty State */}
      {applications.length === 0 ? (
        <div
          className="
          bg-white
          dark:bg-white/5
          border
          border-slate-200
          dark:border-white/10
          rounded-3xl
          p-12
          text-center
        "
        >
          <div className="text-7xl mb-4">📭</div>

          <h2 className="text-2xl font-bold">No Applications Yet</h2>

          <p className="text-slate-500 mt-3">
            Apply for jobs to see them here.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="
              bg-white
              dark:bg-white/5
              backdrop-blur-xl
              border
              border-slate-200
              dark:border-white/10
              rounded-3xl
              p-6
              shadow-lg
              dark:shadow-none
              hover:-translate-y-2
hover:shadow-purple-500/10
hover:shadow-2xl
              transition
            "
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{app.job?.title}</h2>

                  <p className="text-slate-400 mt-2 flex items-center gap-2">
                    🏢 {app.job?.company}
                  </p>
                </div>

                <span
                  className={`
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-semibold
                  ${getStatusColor(app.status)}
                `}
                >
                  {app.status}
                </span>
              </div>

              <div className="mt-5 flex justify-between items-center">
                <p className="text-sm text-slate-500">
                  Applied on {new Date(app.createdAt).toLocaleDateString()}
                </p>

                <button
                  className="
    px-4
    py-2
    rounded-xl
    bg-purple-500/10
    text-purple-500
    text-sm
    font-medium
  "
                >
                  View Job
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </CandidateLayout>
  );
}

export default MyApplications;
