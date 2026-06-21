import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import NotificationMenu from "./NotificationMenu";
import { useState } from "react";

function CandidateNavbar() {
  const location = useLocation();
  const { darkMode, toggleTheme } = useTheme();

  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Resume",
      path: "/resume",
    },
    {
      name: "Jobs",
      path: "/jobs",
    },
    {
      name: "Applications",
      path: "/my-applications",
    },
    {
      name: "Offers",
      path: "/my-offers",
    },
    {
      name: "Insights",
      path: "/ai-insights",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-950/70 border-b border-slate-200 dark:border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/dashboard"
          className="
          text-3xl
          font-extrabold
          bg-gradient-to-r
          from-blue-500
          via-purple-500
          to-pink-500
          bg-clip-text
          text-transparent
          mr-10
        "
        >
          HireSense AI 🚀
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`
                relative
                font-medium
                transition
                hover:text-purple-400
                ${
                  location.pathname === link.path
                    ? "text-purple-500"
                    : "text-slate-700 dark:text-slate-300"
                }
              `}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        {/* Search Bar */}
        <div className="hidden lg:flex flex-1 justify-center px-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search jobs, skills, companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              className="
        w-full
        pl-10
        pr-4
        py-2.5
        bg-slate-100
        dark:bg-white/5
        border
        border-slate-200
        dark:border-white/10
        rounded-xl
        focus:outline-none
        focus:ring-2
        focus:ring-purple-500
        text-slate-700
        dark:text-white
          outline-none
        placeholder:text-slate-400
      "
            />

            <span
              className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
            text-slate-400">
              🔍
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleTheme}
            className="
            cursor-pointer
            w-10
            h-10
            rounded-full
            flex
            items-center
            justify-center
          bg-slate-100
          dark:bg-white/5
          border-slate-200
          dark:border-white/10
          hover:bg-slate-200
          dark:hover:bg-white/10
            transition">
            {darkMode ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-slate-300" />
            )}
          </button>

          <NotificationMenu />

          <ProfileMenu user={JSON.parse(localStorage.getItem("user"))} />
        </div>
      </div>
    </header>
  );
}

export default CandidateNavbar;
