import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Briefcase, Brain, FileText } from "lucide-react";

function GuestProfileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      {/* Avatar */}

      <button
        onClick={() => setOpen(!open)}
        className="
        cursor-pointer
        w-11
        h-11
        rounded-full
        bg-gradient-to-r
        from-purple-600
        to-blue-600
        text-white
        font-bold
        text-lg
        shadow-lg
        hover:scale-105
        transition
        "
      >
        G
      </button>

      {open && (
        <div
          className="
          absolute
          right-0
          mt-4
          w-96

          bg-white/90
          dark:bg-slate-900/95

          backdrop-blur-2xl

          border
          border-slate-200
          dark:border-white/10

          rounded-3xl

          shadow-2xl

          overflow-hidden

          z-50
          "
        >
          {/* Header */}

          <div
            className="
            p-6
            border-b
            border-slate-200
            dark:border-white/10
            "
          >
            <div className="flex items-center gap-4">

              <div
                className="
                w-16
                h-16
                rounded-full

                bg-gradient-to-r
                from-purple-600
                to-blue-600

                text-white
                text-2xl
                font-bold

                flex
                items-center
                justify-center
                "
              >
                G
              </div>

              <div>
                <h3
                  className="
                  text-xl
                  font-bold
                  text-slate-900
                  dark:text-white
                  "
                >
                  Guest User
                </h3>

                <p
                  className="
                  text-slate-500
                  dark:text-slate-400
                  "
                >
                  Explore HireSense AI
                </p>
              </div>

            </div>
          </div>

          {/* Features */}

          <div className="p-6">

            <h4
              className="
              font-semibold
              text-slate-800
              dark:text-white
              mb-4
              "
            >
              Unlock Premium Features
            </h4>

            <div className="space-y-3">

              <div className="flex items-center gap-3">
                <span className="text-green-500">
                  ✓
                </span>

                <span className="text-slate-600 dark:text-slate-300">
                  Upload & Analyze Resume
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-green-500">
                  ✓
                </span>

                <span className="text-slate-600 dark:text-slate-300">
                  AI Job Matching
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-green-500">
                  ✓
                </span>

                <span className="text-slate-600 dark:text-slate-300">
                  Skill Gap Analysis
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-green-500">
                  ✓
                </span>

                <span className="text-slate-600 dark:text-slate-300">
                  Interview Preparation
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-green-500">
                  ✓
                </span>

                <span className="text-slate-600 dark:text-slate-300">
                  Personalized Dashboard
                </span>
              </div>

            </div>

            {/* CTA */}

            <div className="grid grid-cols-2 gap-3 mt-6">

              <Link
                to="/login"
                className="
                text-center
                py-3

                bg-gradient-to-r
                from-blue-600
                to-cyan-600

                hover:from-blue-700
                hover:to-cyan-700

                text-white
                font-semibold

                rounded-xl

                transition
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                text-center
                py-3

                border
                border-purple-500

                text-purple-600
                dark:text-purple-400

                hover:bg-purple-500/10

                rounded-xl

                font-semibold

                transition
                "
              >
                Register
              </Link>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default GuestProfileMenu;