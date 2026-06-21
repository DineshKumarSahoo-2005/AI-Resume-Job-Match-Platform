import { Link } from "react-router-dom";
import GuestProfileMenu from "../components/GuestProfileMenu";
import { Moon, Menu } from "lucide-react";
import { Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav
      className="
      sticky
      top-0
      z-50
      bg-white/90
      backdrop-blur-md
      border-b
      shadow-lg
      border-gray-200
      dark:bg-slate-900

dark:text-white
    "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <h1
            className="
            text-3xl
            font-extrabold
            bg-gradient-to-r
            from-blue-600
            to-purple-600
            bg-clip-text
            text-transparent
          "
          >
            HireSense AI 🚀
          </h1>
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <a href="#features" className="hover:text-blue-600 transition">
            Features
          </a>

          <a href="#how-it-works" className="hover:text-blue-600 transition">
            How It Works
          </a>

          <a href="#tech" className="hover:text-blue-600 transition">
            Tech Stack
          </a>

          <a href="#about" className="hover:text-blue-600 transition">
            About
          </a>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="
            cursor-pointer
    p-2
    rounded-full
    hover:bg-gray-100
    dark:hover:bg-gray-700
  "
          >
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>

          <Link to="/login">
            <button
              className="
              cursor-pointer
              border
              border-blue-600
              text-blue-600
              px-5
              py-2
              rounded-xl
              hover:bg-blue-50
              transition
            "
            >
              Login
            </button>
          </Link>

          <Link to="/register">
            <button
              className="
              cursor-pointer
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              text-white
              px-5
              py-2
              rounded-xl
              hover:scale-105
              transition
            "
            >
              Get Started
            </button>
          </Link>

          <GuestProfileMenu />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
