import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/userService";
import { getDashboardStats } from "../services/dashboardService";
import CandidateLayout from "../layouts/CandidateLayout";

function Profile() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    fetchStats();
  }, []);

  const fetchUser = async () => {
    try {
      const data = await getUserProfile();
      setUser(data.user);
    } catch (error) {
      return;
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      return;
    }
  };

  if (!user) {
    return (
      <CandidateLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <h1 className="text-2xl font-bold dark:text-white">
            Loading Profile...
          </h1>
        </div>
      </CandidateLayout>
    );
  }

  const profileCompletion =
    [user.name, user.email, user.github, user.linkedin, user.bio].filter(
      Boolean,
    ).length * 20;

  return (
    <CandidateLayout>
      {/* Header */}

      <div className="mb-10">
        <h1 className="text-5xl font-bold dark:text-white">👤 My Profile</h1>

        <p className="text-slate-400 mt-3 text-lg">
          Manage your professional profile and career information
        </p>
      </div>

      {/* Hero Card */}

      <div
        className="
        bg-gray-100
        dark:bg-white/5
        border
        border-white/10
        rounded-3xl
        p-8
        mb-8
        backdrop-blur-xl
      "
      >
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div
            className="
            w-32
            h-32
            rounded-full
            bg-gradient-to-r
            from-purple-600
            to-blue-600
            flex
            items-center
            justify-center
            text-5xl
            font-bold
            dark:text-white
            shadow-lg
          "
          >
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="flex-1">
            <h1 className="text-5xl font-bold dark:text-white">{user.name}</h1>

            <p className="text-purple-400 text-xl mt-2">
              AI & Full Stack Developer
            </p>

            <p className="dark:text-slate-400 mt-2">📍 Bhubaneswar, India</p>

            <p className="dark:text-slate-300 text-lg mt-2">📧 {user.email}</p>

            <span
              className="
              inline-block
              mt-4
              px-4
              py-2
              rounded-full
              bg-purple-500/20
              text-purple-400
              border
              border-purple-500/30
            "
            >
              {user.role}
            </span>

            <div className="flex gap-4 mt-6 flex-wrap">
              {user.github && (
                <a
                  href={user.github}
                  target="_blank"
                  rel="noreferrer"
                  className="
                  px-5
                  py-2
                  rounded-xl
                  bg-white/5
                  border
                  border-white/10
                  hover:border-purple-500/50
                  transition
                "
                >
                  🔗 GitHub
                </a>
              )}

              {user.linkedin && (
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="
                  px-5
                  py-2
                  rounded-xl
                  bg-white/5
                  border
                  border-white/10
                  hover:border-blue-500/50
                  transition
                "
                >
                  💼 LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">
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
          <p className="dark:text-slate-400">Resume Status</p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {stats?.resumeUploaded ? "Uploaded ✅" : "Not Uploaded ❌"}
          </h2>
        </div>

        <div
          className="
          bg-emerald-100
          dark:bg-white/5
          border
          border-white/10
          rounded-3xl
          p-6
        "
        >
          <p className="dark:text-slate-400">Skills Extracted</p>

          <h2 className="text-5xl font-bold text-blue-400 mt-2">
            {stats?.skillsCount || 0}
          </h2>
        </div>

        <div
          className="
          bg-fuchsia-100
          dark:bg-white/5
          border
          border-white/10
          rounded-3xl
          p-6
        "
        >
          <p className="dark:text-slate-400">Job Matches</p>

          <h2 className="text-5xl font-bold text-purple-400 mt-2">
            {stats?.jobMatches || 0}
          </h2>
        </div>
      </div>

      {/* About Me */}

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
        <h2 className="text-2xl font-bold dark:text-white mb-4">📝 About Me</h2>

        <p className="dark:text-slate-300 leading-relaxed">
          {user.bio ||
            "No bio added yet. Add a professional summary to improve your profile visibility."}
        </p>
      </div>

      {/* Profile Completion */}

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
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold dark:text-white">
            🚀 Profile Completion
          </h2>

          <span className="text-purple-400 font-bold">
            {profileCompletion}%
          </span>
        </div>

        <div className="w-full h-4 rounded-full bg-white/10 overflow-hidden">
          <div
            className="
            h-full
            bg-gradient-to-r
            from-purple-500
            to-blue-500
            rounded-full
            transition-all
            duration-500
            "
            style={{
              width: `${profileCompletion}%`,
            }}
          />
        </div>

        <p className="dark:text-slate-400 mt-4">
          Complete your profile to improve AI recommendations and recruiter
          visibility.
        </p>
      </div>

      {/* Quick Actions */}

      <div
        className="
        dark:bg-white/5
        border
        border-white/10
        rounded-3xl
        p-6
        mb-8
      "
      >
        <h2 className="text-2xl font-bold dark:text-white mb-6">
          ⚡ Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/resume")}
            className="
            cursor-pointer
            px-6
            py-3
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            dark:text-white
            font-semibold
          "
          >
            📄 View Resume
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="
            cursor-pointer
            px-6
            py-3
            rounded-xl
            bg-purple-600
            hover:bg-purple-700
            dark:text-white
            font-semibold
          "
          >
            ✏️ Edit Profile
          </button>
        </div>
      </div>

      {/* Account Information */}

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
        <h2 className="text-2xl font-bold dark:text-white mb-6">
          🔐 Account Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-slate-400">Full Name</p>
            <p className="dark:text-white mt-1">{user.name}</p>
          </div>

          <div>
            <p className="text-slate-400">Email</p>
            <p className="dark:text-white mt-1">{user.email}</p>
          </div>

          <div>
            <p className="text-slate-400">Role</p>
            <p className="dark:text-white mt-1">{user.role}</p>
          </div>
        </div>
      </div>
    </CandidateLayout>
  );
}

export default Profile;
