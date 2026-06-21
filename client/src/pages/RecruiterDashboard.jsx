import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRecruiterAnalytics } from "../services/analyticsService";
import RecruiterLayout from "../layouts/RecruiterLayout";
import { getMyJobs } from "../services/jobPostService";
import { getRecruiterInterviews } from "../services/interviewService";

function RecruiterDashboard() {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState({
    jobsPosted: 0,
    interviewsScheduled: 0,
    selectedCandidates: 0,
    successRate: 0,
  });
  const pipeline = [
    {
      title: "Applied",
      count: analytics.jobsPosted * 5,
      color: "border-blue-500",
      icon: "📄",
    },
    {
      title: "Interview",
      count: analytics.interviewsScheduled,
      color: "border-yellow-500",
      icon: "📅",
    },
    {
      title: "Selected",
      count: analytics.selectedCandidates,
      color: "border-green-500",
      icon: "✅",
    },
    {
      title: "Rejected",
      count: analytics.jobsPosted * 2 - analytics.selectedCandidates,
      color: "border-red-500",
      icon: "❌",
    },
  ];
  const [recentJobs, setRecentJobs] = useState([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [topCandidate, setTopCandidate] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const data = await getRecruiterAnalytics();

      setAnalytics(data.analytics);
      const jobsData = await getMyJobs();

      setRecentJobs(jobsData.jobs.slice(0, 3));
      const interviewData = await getRecruiterInterviews();

      setUpcomingInterviews(
        interviewData.interviews
          .filter((i) => i.status === "Scheduled")
          .slice(0, 3),
      );
      const matches = await getTopCandidates();

      if (matches?.length > 0) {
        setTopCandidate(matches[0]);
      }
    } catch (error) {
      return;
    }
  };

  return (
    <RecruiterLayout>
      <div
        className="
  mb-8
  p-8
  rounded-3xl
  bg-gradient-to-r
  from-purple-600/20
  via-blue-600/10
  to-pink-600/20
  border
  border-white/10
  backdrop-blur-xl
"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold">Welcome Back 👨‍💼</h1>

            <p className="text-slate-400 mt-3">
              Manage jobs, interviews and candidates from one place.
            </p>
          </div>

          <div
            className="
      hidden md:flex
      items-center
      justify-center
      w-28
      h-28
      rounded-3xl
      bg-white/5
      text-5xl
    "
          >
            🚀
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div
          className="
  bg-blue-100
  dark:bg-white/5
  border
  border-white/10
  backdrop-blur-xl
  rounded-3xl
  p-6
  hover:scale-105
  transition
  "
        >
          <p className="dark:text-slate-400 font-bold">Jobs Posted</p>

          <h2 className="text-4xl font-bold mt-2">{analytics.jobsPosted}</h2>
        </div>

        <div
          className="
  bg-yellow-100
  dark:bg-white/5
  border
  border-white/10
  backdrop-blur-xl
  rounded-3xl
  p-6
  hover:scale-105
  transition
  "
        >
          <p className="dark:text-slate-400 font-bold">Interviews</p>

          <h2 className="text-4xl font-bold mt-2">
            {analytics.interviewsScheduled}
          </h2>
        </div>

        <div
          className="
  bg-green-100
  dark:bg-white/5
  border
  border-white/10
  backdrop-blur-xl
  rounded-3xl
  p-6
  hover:scale-105
  transition
  "
        >
          <p className="dark:text-slate-400 font-bold">Selected</p>

          <h2 className="text-4xl font-bold mt-2">
            {analytics.selectedCandidates}
          </h2>
        </div>

        <div
          className="
  bg-purple-100
  dark:bg-white/5
  border
  border-white/10
  backdrop-blur-xl
  rounded-3xl
  p-6
  hover:scale-105
  transition
  "
        >
          <p className="dark:text-slate-400 font-bold">Success Rate</p>

          <h2 className="text-4xl font-bold mt-2">{analytics.successRate}%</h2>
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <div
          onClick={() => navigate("/post-job")}
          className="
  cursor-pointer
  bg-cyan-100
  dark:bg-white/5
  border
  border-white/10
  p-6
  rounded-3xl
  hover:scale-105
  transition
"
        >
          <h2 className="text-3xl mb-3">➕</h2>

          <h3 className="font-bold text-lg">Post Job</h3>

          <p className="dark:text-slate-400 mt-2 text-sm">
            Create new openings
          </p>
        </div>
        <div
          onClick={() => navigate("/my-jobs")}
          className="
  cursor-pointer
  bg-emerald-100
  dark:bg-white/5
  border
  border-white/10
  p-6
  rounded-3xl
  hover:scale-105
  transition
"
        >
          <h2 className="text-3xl mb-3">📋</h2>

          <h3 className="font-bold text-lg">My Jobs</h3>

          <p className="dark:text-slate-400 mt-2 text-sm">
            Manage job postings
          </p>
        </div>
        <div
          onClick={() => navigate("/analytics")}
          className="
  cursor-pointer
  bg-fuchsia-100
  dark:bg-white/5
  border
  border-white/10
  p-6
  rounded-3xl
  hover:scale-105
  transition
"
        >
          <h2 className="text-3xl mb-3">📊</h2>

          <h3 className="font-bold text-lg">Analytics</h3>

          <p className="dark:text-slate-400 mt-2 text-sm">Hiring insights</p>
        </div>
        <div
          onClick={() => navigate("/interviews")}
          className="
  cursor-pointer
  bg-indigo-100
  dark:bg-white/5
  border
  border-white/10
  p-6
  rounded-3xl
  hover:scale-105
  transition
"
        >
          <h2 className="text-3xl mb-3">📅</h2>

          <h3 className="font-bold text-lg">Interviews</h3>

          <p className="dark:text-slate-400 mt-2 text-sm">Manage interviews</p>
        </div>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-5">Hiring Pipeline</h2>

        <div className="grid md:grid-cols-4 gap-4">
          {pipeline.map((item, index) => (
            <div
              key={index}
              className={`
          bg-white/5
          border
          ${item.color}
          backdrop-blur-xl
          rounded-3xl
          p-6
          hover:scale-105
          transition
        `}
            >
              <p className="text-3xl mb-3">{item.icon}</p>

              <h3 className="text-slate-400">{item.title}</h3>

              <p className="text-4xl font-bold mt-2">{item.count}</p>
            </div>
          ))}
        </div>
      </div>
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Jobs</h2>

          <button
            onClick={() => navigate("/my-jobs")}
            className="
      text-purple-400
      hover:text-purple-300
      "
          >
            View All →
          </button>
        </div>

        <div className="space-y-4">
          {recentJobs.length === 0 ? (
            <p className="text-slate-400">No jobs posted yet.</p>
          ) : (
            recentJobs.map((job) => (
              <div
                key={job._id}
                className="
          bg-gray-100
          dark:bg-black/20
          rounded-2xl
          p-4
          flex
          justify-between
          items-center
          "
              >
                <div>
                  <h3 className="font-bold text-lg">{job.title}</h3>

                  <p className="text-slate-400">{job.company}</p>
                </div>

                <button
                  onClick={() => navigate(`/candidates/${job._id}`)}
                  className="
            px-4
            py-2
            rounded-xl
            bg-purple-600
            hover:bg-purple-700
            text-white
            "
                >
                  Candidates
                </button>
              </div>
            ))
          )}
        </div>
      </div>
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Upcoming Interviews</h2>

          <button
            onClick={() => navigate("/interviews")}
            className="
      text-purple-400
      hover:text-purple-300
      "
          >
            View All →
          </button>
        </div>

        {upcomingInterviews.length === 0 ? (
          <p className="text-slate-400">No upcoming interviews.</p>
        ) : (
          <div className="space-y-4">
            {upcomingInterviews.map((interview) => (
              <div
                key={interview._id}
                className="
          bg-gray-100
          dark:bg-black/20
          rounded-2xl
          p-4
          flex
          justify-between
          items-center
          "
              >
                <div>
                  <h3 className="font-bold">{interview.candidate?.name}</h3>

                  <p className="text-slate-400 text-sm">
                    {interview.job?.title}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-purple-400">📅</p>

                  <p className="text-sm">
                    {new Date(interview.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        className="
  bg-gradient-to-r
  from-purple-500/10
  to-pink-500/10
  border
  border-purple-500/20
  rounded-3xl
  p-6
  mb-8
"
      >
        <h2 className="text-2xl font-bold mb-4">🤖 Top AI Candidate Match</h2>

        {topCandidate ? (
          <div>
            <h3 className="text-xl font-bold">{topCandidate.name}</h3>

            <p className="text-slate-400">{topCandidate.jobTitle}</p>

            <div
              className="
        mt-4
        inline-block
        px-4
        py-2
        rounded-full
        bg-green-500/20
        text-green-400
        font-bold
      "
            >
              {topCandidate.matchScore}% Match
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {topCandidate.skills?.map((skill) => (
                <span
                  key={skill}
                  className="
            px-3
            py-1
            rounded-full
            bg-white/5
            text-sm
          "
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <p>No matches available</p>
        )}
      </div>
      <div
        className="
  bg-white/5
  border
  border-white/10
  rounded-3xl
  p-6
  mt-8
"
      >
        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>

        <div className="space-y-4">
          <div>📄 Job posted successfully</div>

          <div>👨‍💻 Interview scheduled</div>

          <div>🎯 Candidate shortlisted</div>
        </div>
      </div>
    </RecruiterLayout>
  );
}

export default RecruiterDashboard;
