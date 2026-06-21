import { useEffect, useState } from "react";
import RecruiterLayout from "../layouts/RecruiterLayout";
import { getRecruiterAnalytics } from "../services/recruiterAnalyticsService";

function RecruiterAnalytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const data = await getRecruiterAnalytics();
      setAnalytics(data.analytics);
    } catch (error) {
      return;
    }
  };

  if (!analytics) {
    return (
      <RecruiterLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <h1 className="text-2xl font-bold">
            Loading Analytics...
          </h1>
        </div>
      </RecruiterLayout>
    );
  }

  return (
    <RecruiterLayout>
      {/* Header */}

      <div className="mb-10">
        <h1 className="text-5xl font-bold">
          📊 Recruitment Analytics
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          Real-time insights from your hiring activities.
        </p>
      </div>

      {/* Analytics Cards */}

      <div className="grid md:grid-cols-4 gap-6">

        {/* Jobs Posted */}

        <div
          className="
          bg-blue-500/10
          border
          border-blue-500/20
          rounded-3xl
          p-6
          "
        >
          <p className="text-slate-400">
            Jobs Posted
          </p>

          <h2 className="text-5xl font-bold mt-3 text-blue-400">
            {analytics.jobsPosted}
          </h2>
        </div>

        {/* Interviews */}

        <div
          className="
          bg-yellow-500/10
          border
          border-yellow-500/20
          rounded-3xl
          p-6
          "
        >
          <p className="text-slate-400">
            Interviews Scheduled
          </p>

          <h2 className="text-5xl font-bold mt-3 text-yellow-400">
            {analytics.interviewsScheduled}
          </h2>
        </div>

        {/* Selected */}

        <div
          className="
          bg-green-500/10
          border
          border-green-500/20
          rounded-3xl
          p-6
          "
        >
          <p className="text-slate-400">
            Selected Candidates
          </p>

          <h2 className="text-5xl font-bold mt-3 text-green-400">
            {analytics.selectedCandidates}
          </h2>
        </div>

        {/* Success Rate */}

        <div
          className="
          bg-purple-500/10
          border
          border-purple-500/20
          rounded-3xl
          p-6
          "
        >
          <p className="text-slate-400">
            Success Rate
          </p>

          <h2 className="text-5xl font-bold mt-3 text-purple-400">
            {analytics.successRate}%
          </h2>
        </div>

      </div>

      {/* Summary */}

      <div
        className="
        mt-10
        bg-white
        dark:bg-white/5
        border
        border-white/10
        rounded-3xl
        p-8
        "
      >
        <h2 className="text-2xl font-bold mb-6">
          📈 Hiring Summary
        </h2>

        <div className="space-y-4 text-lg">

          <p>
            💼 You have posted{" "}
            <strong>
              {analytics.jobsPosted}
            </strong>{" "}
            jobs.
          </p>

          <p>
            📅 You have scheduled{" "}
            <strong>
              {analytics.interviewsScheduled}
            </strong>{" "}
            interviews.
          </p>

          <p>
            🏆 You have selected{" "}
            <strong>
              {analytics.selectedCandidates}
            </strong>{" "}
            candidates.
          </p>

          <p>
            🚀 Current hiring success rate is{" "}
            <strong>
              {analytics.successRate}%
            </strong>
            .
          </p>

        </div>
      </div>
    </RecruiterLayout>
  );
}

export default RecruiterAnalytics;