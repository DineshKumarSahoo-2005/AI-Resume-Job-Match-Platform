import { useEffect, useState } from "react";
import RecruiterLayout from "../layouts/RecruiterLayout";
import { getUserProfile } from "../services/userService";
import { getRecruiterAnalytics } from "../services/recruiterAnalyticsService";
import { useNavigate } from "react-router-dom";

function RecruiterProfile() {
  const [user, setUser] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchProfile();
    fetchAnalytics();
  }, []);

  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      setUser(data.user);
    } catch (error) {
      return;
    }
  };

  const fetchAnalytics = async () => {
    try {
      const data = await getRecruiterAnalytics();

      setAnalytics(data);
    } catch (error) {
      return;
    }
  };

  if (!user) {
    return (
      <RecruiterLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <h1 className="text-2xl font-bold">Loading Profile...</h1>
        </div>
      </RecruiterLayout>
    );
  }

  return (
    <RecruiterLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}

        <div
          className="
          bg-neutral-100
          dark:bg-white/5
          border border-white/10
          rounded-3xl
          p-8
          mb-8
          "
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div
              className="
              w-28
              h-28
              rounded-full
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              flex
              items-center
              justify-center
              text-5xl
              font-bold
              text-white
              "
            >
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-4xl font-bold">{user.name}</h1>

              <p className="text-slate-400 mt-2">{user.email}</p>

              <span
                className="
                inline-block
                mt-3
                px-4
                py-2
                rounded-full
                bg-purple-500/20
                text-purple-400
                "
              >
                Recruiter
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate("/edit-recruiter-profile")}
            className="
  mt-4
  px-5
  py-2
  rounded-xl
  bg-gradient-to-r
  from-blue-600
  to-purple-600
  "
          >
            Edit Profile
          </button>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div
            className="
            bg-purple-100
    dark:bg-white/5
    border border-white/10
    rounded-3xl
    p-6
    "
          >
            <h3 className="text-slate-400">Jobs Posted</h3>

            <p className="text-4xl font-bold mt-2 text-purple-400">
              {analytics?.totalJobs || 0}
            </p>
          </div>

          <div
            className="
            bg-blue-100
    dark:bg-white/5
    border border-white/10
    rounded-3xl
    p-6
    "
          >
            <h3 className="text-slate-400">Candidates Reviewed</h3>

            <p className="text-4xl font-bold mt-2 text-blue-400">
              {analytics?.totalCandidates || 0}
            </p>
          </div>

          <div
            className="
            bg-green-100
    dark:bg-white/5
    border border-white/10
    rounded-3xl
    p-6
    "
          >
            <h3 className="text-slate-400">Interviews</h3>

            <p className="text-4xl font-bold mt-2 text-green-400">3</p>
          </div>

          <div
            className="
            bg-orange-100
    dark:bg-white/5
    border border-white/10
    rounded-3xl
    p-6
    "
          >
            <h3 className="text-slate-400">Offers Sent</h3>

            <p className="text-4xl font-bold mt-2 text-orange-400">1</p>
          </div>
        </div>

        {/* About */}

        <div
          className="
          bg-white/5
          border border-white/10
          rounded-3xl
          p-8
          mb-8
          "
        >
          <h2 className="text-2xl font-bold mb-4">📝 About</h2>

          <p className="dark:text-slate-300">
            {user.bio || "No bio added yet."}
          </p>
        </div>

        <div
          className="
  bg-white/5
  border border-white/10
  rounded-3xl
  p-8
  mb-8
  "
        >
          <h2 className="text-2xl font-bold mb-6">🚀 Top Hiring Skills</h2>

          <div className="flex flex-wrap gap-3">
            {analytics?.topSkills?.map(([skill, count]) => (
              <div
                key={skill}
                className="
          px-4
          py-2
          rounded-full
          bg-purple-500/20
          text-purple-400
          "
              >
                {skill} ({count})
              </div>
            ))}
          </div>
        </div>

        {/* Links */}

        <div
          className="
          bg-white/5
          border border-white/10
          rounded-3xl
          p-8
          "
        >
          <h2 className="text-2xl font-bold mb-4">🔗 Professional Links</h2>

          <div className="space-y-4">
            <p>
              LinkedIn:{" "}
              {user.linkedin ? (
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 ml-2"
                >
                  Open Profile
                </a>
              ) : (
                " Not Added"
              )}
            </p>

            <p>
              GitHub:{" "}
              {user.github ? (
                <a
                  href={user.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 ml-2"
                >
                  Open Profile
                </a>
              ) : (
                " Not Added"
              )}
            </p>
          </div>
        </div>
      </div>
    </RecruiterLayout>
  );
}

export default RecruiterProfile;
