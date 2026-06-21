import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import RecruiterProfileMenu from "./RecruiterProfileMenu";
import NotificationMenu from "./NotificationMenu";

function RecruiterNavbar() {
  const user = JSON.parse(
  localStorage.getItem("user")
);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav
      className="
      sticky
      top-0
      z-50
      bg-white
      dark:bg-[#0F172A]
      border-b
      border-slate-200
      dark:border-slate-800
      shadow-sm
    "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-4
        flex
        items-center
        justify-between
      "
      >
        {/* Logo */}

        <Link
          to="/recruiter-dashboard"
          className="
          text-3xl
          font-bold
          bg-gradient-to-r
          from-blue-600
          to-purple-600
          bg-clip-text
          text-transparent
        "
        >
          HireSense AI 🚀
        </Link>

        {/* Menu */}

        <div className="hidden md:flex gap-8 font-medium">
          <Link to="/recruiter-dashboard">
            Dashboard
          </Link>

          <Link to="/my-jobs">
            Jobs
          </Link>

          <Link to="/interviews">
            Interviews
          </Link>

          <Link to="/analytics">
            Analytics
          </Link>

          <Link to="/recruiter-offers">
            Offers
          </Link>
        </div>

        {/* Right */}

        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="
            w-10
            h-10
            rounded-full
            bg-slate-100
            dark:bg-slate-800
          "
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <NotificationMenu/>

          <RecruiterProfileMenu user={user} />
        </div>
      </div>
    </nav>
  );
}

export default RecruiterNavbar;