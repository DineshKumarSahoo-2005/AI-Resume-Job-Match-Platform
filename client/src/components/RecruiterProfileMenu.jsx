import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RecruiterProfileMenu({ user }) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const menuRef = useRef();

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "R";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      {/* Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-12
          h-12
          rounded-full
          bg-gradient-to-r
          from-blue-600
          to-purple-600
          text-white
          font-bold
          text-lg
          flex
          items-center
          justify-center
          shadow-lg
          hover:scale-105
          transition
        "
      >
        {firstLetter}
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            mt-4
            w-80
            bg-white
            dark:bg-slate-900
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
              bg-gradient-to-r
              from-blue-600
              via-purple-600
              to-pink-600
              text-white
            "
          >
            <div
              className="
                w-16
                h-16
                rounded-full
                bg-white/20
                flex
                items-center
                justify-center
                text-2xl
                font-bold
                mb-3
              "
            >
              {firstLetter}
            </div>

            <h3 className="font-bold text-lg">{user?.name || "Recruiter"}</h3>

            <p className="text-sm text-white/80">
              {user?.email || "recruiter@email.com"}
            </p>

            <span
              className="
                inline-block
                mt-3
                px-3
                py-1
                rounded-full
                bg-white/20
                text-xs
              "
            >
              Recruiter
            </span>
          </div>

          {/* Menu */}
          <div className="p-3">
            <button
              onClick={() => navigate("/recruiter-dashboard")}
              className="
                w-full
                text-left
                px-4
                py-3
                rounded-xl
                hover:bg-slate-100
                dark:hover:bg-slate-800
              "
            >
              📊 Dashboard
            </button>

            <button
              onClick={() => navigate("/recruiter-profile")}
              className="
                w-full
                text-left
                px-4
                py-3
                rounded-xl
                hover:bg-slate-100
                dark:hover:bg-slate-800
              "
            >
              👤 My Profile
            </button>

            <button
              onClick={() => navigate("/my-jobs")}
              className="
                w-full
                text-left
                px-4
                py-3
                rounded-xl
                hover:bg-slate-100
                dark:hover:bg-slate-800
              "
            >
              💼 My Jobs
            </button>

            <button
              onClick={() => navigate("/interviews")}
              className="
                w-full
                text-left
                px-4
                py-3
                rounded-xl
                hover:bg-slate-100
                dark:hover:bg-slate-800
              "
            >
              📅 Interviews
            </button>

            <button
              onClick={() => navigate("/recruiter-settings")}
              className="
                w-full
                text-left
                px-4
                py-3
                rounded-xl
                hover:bg-slate-100
                dark:hover:bg-slate-800
              "
            >
              ⚙️ Settings
            </button>

            <hr className="my-3" />

            <button
              onClick={logout}
              className="
                w-full
                text-left
                px-4
                py-3
                rounded-xl
                text-red-500
                hover:bg-red-50
                dark:hover:bg-red-900/20
              "
            >
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecruiterProfileMenu;
