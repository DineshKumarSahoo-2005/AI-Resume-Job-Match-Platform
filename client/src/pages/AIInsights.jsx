import { useEffect, useState } from "react";
import { getResumeInsights } from "../services/aiService";
import CandidateLayout from "../layouts/CandidateLayout";

function AIInsights() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const data = await getResumeInsights();
      setInsights(data);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <CandidateLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <h1 className="text-2xl font-bold dark:text-white">
            🤖 Analyzing Resume...
          </h1>
        </div>
      </CandidateLayout>
    );
  }

  return (
    <CandidateLayout>
      {/* Header */}

      <div className="mb-10">
        <h1 className="text-5xl font-bold dark:text-white mb-3">
          🤖 AI Resume Insights
        </h1>

        <p className="text-slate-400 text-lg">
          AI-powered analysis of your resume and career readiness
        </p>
      </div>

      {/* Score Section */}

      <div
        className="
        bg-gradient-to-r
        from-purple-500/10
        to-blue-500/10
        border
        border-white/10
        rounded-3xl
        p-8
        mb-8
      "
      >
        <p className="text-slate-400 mb-3">Resume Score</p>

        <h2
          className="
          text-7xl
          font-extrabold
          bg-gradient-to-r
          from-purple-400
          to-cyan-400
          bg-clip-text
          text-transparent
        "
        >
          {insights.score}/100
        </h2>

        <p className="text-xl dark:text-white mt-4">
          Level:
          <span className="text-green-400 font-bold ml-2">
            {insights.level}
          </span>
        </p>
      </div>

      {/* Stats Grid */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">
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
          <p className="text-slate-400">Strengths</p>

          <h2 className="text-4xl font-bold text-green-400 mt-2">
            {insights.strengths.length}
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
          <p className="text-slate-400">Missing Skills</p>

          <h2 className="text-4xl font-bold text-red-400 mt-2">
            {insights.missingSkills.length}
          </h2>
        </div>

        <div
          className="
          bg-cyan-100
          dark:bg-white/5
          border
          border-white/10
          rounded-3xl
          p-6
        "
        >
          <p className="text-slate-400">Improvement Areas</p>

          <h2 className="text-4xl font-bold text-yellow-400 mt-2">5</h2>
        </div>
      </div>

      {/* Strengths */}

      <div
        className="
        bg-neutral-100
        dark:bg-white/5
        border
        border-white/10
        rounded-3xl
        p-6
        mb-8
      "
      >
        <h2 className="text-2xl font-bold text-green-600 mb-5">✅ Strengths</h2>

        <div className="flex flex-wrap gap-3">
          {insights.strengths.map((skill, index) => (
            <span
              key={index}
              className="
              px-4
              py-2
              rounded-full
              bg-green-500/20
              text-green-600
              border
              border-green-500/30
            "
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Missing Skills */}

      <div
        className="
        bg-neutral-100
        dark:bg-white/5
        border
        border-white/10
        rounded-3xl
        p-6
        mb-8
      "
      >
        <h2 className="text-2xl font-bold text-red-600 mb-5">
          ❌ Missing Skills
        </h2>

        <div className="flex flex-wrap gap-3">
          {insights.missingSkills.map((skill, index) => (
            <span
              key={index}
              className="
              px-4
              py-2
              rounded-full
              bg-red-500/20
              text-red-600
              border
              border-red-500/30
            "
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Suggestions */}

      <div
        className="
        bg-neutral-100
        dark:bg-white/5
        border
        border-white/10
        rounded-3xl
        p-6
      "
      >
        <h2 className="text-2xl font-bold text-purple-400 mb-5">
          🚀 Improvement Suggestions
        </h2>

        <div className="space-y-4">
          <div
            className="bg-gray-200
        dark:bg-white/5 rounded-2xl p-4"
          >
            Learn Docker for deployment skills.
          </div>

          <div
            className="bg-gray-200
        dark:bg-white/5 rounded-2xl p-4"
          >
            Gain AWS Cloud experience.
          </div>

          <div
            className="bg-gray-200
        dark:bg-white/5 rounded-2xl p-4"
          >
            Study Kubernetes fundamentals.
          </div>

          <div
            className="bg-gray-200
        dark:bg-white/5 rounded-2xl p-4"
          >
            Improve System Design knowledge.
          </div>

          <div
            className="bg-gray-200
        dark:bg-white/5 rounded-2xl p-4"
          >
            Build more production-level projects.
          </div>
        </div>
      </div>
    </CandidateLayout>
  );
}

export default AIInsights;
