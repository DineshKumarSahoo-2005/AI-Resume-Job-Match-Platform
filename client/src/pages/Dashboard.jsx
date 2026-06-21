import { useState, useEffect } from "react";
import { uploadResume, getMyResume } from "../services/resumeService";
import { getMatches } from "../services/matchService";
import { getUserProfile } from "../services/userService";
import ProfileMenu from "../components/ProfileMenu";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import CandidateLayout from "../layouts/CandidateLayout";
import StatsCards from "../components/StatsCard";
import QuickActions from "../components/QuickActions";
import TopJobMatches from "../components/TopJobMatches";
import RecentActivity from "../components/RecentActivity";
import AIInsights from "../components/AIInsights";

function Dashboard() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [matches, setMatches] = useState([]);
  const [resumeData, setResumeData] = useState(null);
  const [user, setUser] = useState(null);
  const [completion, setCompletion] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMatches();
    fetchResume();
    fetchUser();
  }, []);
  useEffect(() => {
    setCompletion(calculateProfileCompletion(user, resumeData));
  }, [user, resumeData]);

  const fetchResume = async () => {
    try {
      const data = await getMyResume();
      if (data.resume) {
        setResumeData(data.resume);
      }
    } catch (error) {
      return;
    }
  };

  const fetchMatches = async () => {
    try {
      const data = await getMatches();
      setMatches(data.matches || []);
    } catch (error) {
      return;
    }
  };

  const fetchUser = async () => {
    try {
      const data = await getUserProfile();

      setUser(data.user);
    } catch (error) {
      return;
    }
  };

  const calculateProfileCompletion = (user, resume) => {
    let score = 0;

    if (user?.name) score += 20;
    if (user?.email) score += 20;
    if (user?.github) score += 20;
    if (user?.linkedin) score += 20;
    if (resume) score += 20;

    return score;
  };

  const calculateResumeScore = () => {
    let score = 0;

    if (user?.name) score += 15;
    if (user?.email) score += 15;
    if (user?.github) score += 15;
    if (user?.linkedin) score += 15;

    if (resumeData?.skills?.length >= 5) score += 20;

    if (resumeData) score += 20;

    return score;
  };
  const resumeScore = calculateResumeScore();

  const handleUpload = async () => {
    if (!file) {
      return alert("Select Resume");
    }
    try {
      await uploadResume(file);
      setMessage("Resume Uploaded Successfully ✅");
      fetchResume();
      fetchMatches();
    } catch (error) {
      setMessage("Upload Failed ❌");
    }
  };

  const totalSkills = resumeData?.skills?.length || 0;
  const totalMissingSkills = matches.reduce(
    (count, job) => count + (job.missingSkills?.length || 0),
    0,
  );

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <CandidateLayout>
      <div
        className="
  mb-8
  p-10
  rounded-3xl
  bg-white
  dark:bg-white/5
  border
  border-slate-200
  dark:border-white/10
  shadow-lg
  dark:shadow-none
  backdrop-blur-xl
"
      >
        <div className="flex justify-between items-start">
          {/* Left Side */}
          <div className="w-full">
            <h1 className="text-5xl font-bold">
              Welcome Back {user?.name?.split(" ")[0]} 👋
            </h1>

            <p className="text-slate-600 dark:text-slate-400 mt-3">
              Ready to discover your next opportunity?
            </p>

            {/* Progress */}
            <div className="mt-6 max-w-xl">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600 dark:text-slate-400">
                  Profile Completion
                </span>

                <span className="font-semibold">{completion}%</span>
              </div>

              <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full">
                <div
                  className="
            h-3
            rounded-full
            bg-gradient-to-r
            from-purple-500
            to-pink-500
            transition-all
            duration-500
            "
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>

            {/* Stats Row */}
            <div
              className="
        flex
        flex-wrap
        items-center
        gap-8
        mt-6
        text-slate-600
        dark:text-slate-300
      "
            >
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span>🛠</span>
                <span>{totalSkills} Skills</span>
              </div>

              <div className="flex items-center gap-2 whitespace-nowrap">
                <span>🎯</span>
                <span>{matches.length} Matches</span>
              </div>

              <div className="flex items-center gap-2 whitespace-nowrap">
                <span>📄</span>
                <span>Resume Uploaded</span>
              </div>
            </div>
          </div>

          {/* Right Side Resume Score */}
          <div className="hidden md:block">
            <div
              className="
  min-w-[180px]
  p-6
  rounded-3xl

  bg-gradient-to-br
  from-purple-500/10
  to-pink-500/10

  border
  border-purple-500/20

  text-center
"
            >
              <p className="text-sm text-slate-500">Resume Score</p>

              <h2 className="text-6xl font-bold text-purple-500 mt-2">
                {resumeScore}/100
              </h2>

              <div
                className="
    mt-3
    inline-block
    px-3
    py-1
    rounded-full
    bg-green-500/10
    text-green-500
    text-sm
    font-semibold
    "
              >
                Top 5% Profile
              </div>
            </div>
          </div>
        </div>
      </div>

      <StatsCards
        resumeData={resumeData}
        totalSkills={totalSkills}
        matches={matches}
        totalMissingSkills={totalMissingSkills}
      />

      <QuickActions />

      <div
        className="
  grid
  lg:grid-cols-2
  gap-6
  mt-8
  items-start
"
      >
        <RecentActivity />
        <AIInsights resumeData={resumeData} />
      </div>

      <TopJobMatches matches={matches} />
    </CandidateLayout>
  );
}

export default Dashboard;
