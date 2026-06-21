import { useEffect, useState } from "react";
import {
  getRecruiterInterviews,
  updateInterviewStatus,
} from "../services/interviewService";
import RecruiterLayout from "../layouts/RecruiterLayout";
import { useNavigate } from "react-router-dom";

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const data = await getRecruiterInterviews();
      setInterviews(data.interviews);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateInterviewStatus(id, status);

      setInterviews((prev) =>
        prev.map((interview) =>
          interview._id === id
            ? {
                ...interview,
                status,
              }
            : interview,
        ),
      );
    } catch (error) {
      return;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-yellow-500/20 text-yellow-400";

      case "Completed":
        return "bg-blue-500/20 text-blue-400";

      case "Selected":
        return "bg-green-500/20 text-green-400";

      case "Rejected":
        return "bg-red-500/20 text-red-400";

      default:
        return "";
    }
  };

  const scheduled = interviews.filter((i) => i.status === "Scheduled").length;

  const completed = interviews.filter((i) => i.status === "Completed").length;

  const selected = interviews.filter((i) => i.status === "Selected").length;

  const rejected = interviews.filter((i) => i.status === "Rejected").length;

  if (loading) {
    return (
      <RecruiterLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <h1 className="text-2xl font-bold text-white">
            Loading Interviews...
          </h1>
        </div>
      </RecruiterLayout>
    );
  }

  return (
    <RecruiterLayout>
      {/* Header */}

      <div className="mb-10">
        <h1 className="text-5xl font-bold dark:text-white">📅 Interviews</h1>

        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Manage scheduled interviews and hiring decisions
        </p>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <div
          className="
          bg-amber-100
          dark:bg-white/5
          border
        border-white/10
          rounded-3xl
          p-6
          "
        >
          <p className="dark:text-slate-400">Scheduled</p>

          <h2 className="text-4xl font-bold text-yellow-400 mt-2">
            {scheduled}
          </h2>
        </div>

        <div
          className="
          bg-blue-100
          dark:bg-white/5
          border
          border-white/10
          rounded-3xl
          p-6
          "
        >
          <p className="dark:text-slate-400">Completed</p>

          <h2 className="text-4xl font-bold text-blue-400 mt-2">{completed}</h2>
        </div>

        <div
          className="
          bg-green-100
          dark:bg-white/5
          border
          border-white/10
          rounded-3xl
          p-6
          "
        >
          <p className="dark:text-slate-400">Selected</p>

          <h2 className="text-4xl font-bold text-green-400 mt-2">{selected}</h2>
        </div>

        <div
          className="
          bg-red-100
          dark:bg-white/5
          border
          border-white/10
          rounded-3xl
          p-6
          "
        >
          <p className="dark:text-slate-400">Rejected</p>

          <h2 className="text-4xl font-bold text-red-400 mt-2">{rejected}</h2>
        </div>
      </div>

      {/* Empty State */}

      {interviews.length === 0 ? (
        <div
          className="
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-12
          text-center
          "
        >
          <h2 className="text-2xl font-bold text-white">
            No Interviews Scheduled
          </h2>

          <p className="text-slate-400 mt-3">
            Schedule interviews from the Candidates page
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {interviews.map((interview) => (
            <div
              key={interview._id}
              className="
              bg-neutral-100
              dark:bg-white/5
              border
              border-white/10
              rounded-3xl
              p-6
              backdrop-blur-md
              hover:scale-[1.01]
              transition
              duration-300
              "
            >
              <div className="flex flex-col md:flex-row justify-between">
                {/* Left Side */}

                <div>
                  <h2 className="text-2xl font-bold dark:text-white">
                    👤 {interview.candidate?.name}
                  </h2>

                  <p className="dark:text-slate-400 mt-2">
                    📧 {interview.candidate?.email}
                  </p>

                  <div className="mt-5 space-y-2">
                    <p className="dark:text-white">💼 {interview.job?.title}</p>

                    <p className="dark:text-slate-400">
                      🏢 {interview.job?.company}
                    </p>

                    <p className="text-cyan-400">
                      📅 {new Date(interview.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Status */}

                <div className="mt-5 md:mt-0">
                  <span
                    className={`
    px-4 py-2 rounded-full
    text-sm font-semibold
    ${getStatusColor(interview.status)}
  `}
                  >
                    {interview.status}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              {interview.status === "Scheduled" && (
                <div className="flex flex-wrap gap-3 mt-8">
                  <button
                    onClick={() =>
                      handleStatusChange(interview._id, "Completed")
                    }
                    className="
                  px-5
                  py-2
                  rounded-xl
                  bg-yellow-500
                  hover:bg-yellow-600
                  text-white
                  "
                  >
                    Complete
                  </button>

                  <button
                    onClick={() =>
                      handleStatusChange(interview._id, "Selected")
                    }
                    className="
                  px-5
                  py-2
                  rounded-xl
                  bg-green-500
                  hover:bg-green-600
                  text-white
                  "
                  >
                    Select
                  </button>

                  <button
                    onClick={() =>
                      handleStatusChange(interview._id, "Rejected")
                    }
                    className="
                  px-5
                  py-2
                  rounded-xl
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  "
                  >
                    Reject
                  </button>
                </div>
              )}

              {interview.status === "Selected" && (
                <button
                  onClick={() =>
                    navigate(
                      `/generate-offer/${interview.candidate._id}/${interview.job._id}`,
                    )
                  }
                  className="
    px-5
    py-2
    rounded-xl
    bg-purple-600
    hover:bg-purple-700
    text-white
    "
                >
                  📄 Generate Offer Letter
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </RecruiterLayout>
  );
}

export default Interviews;
