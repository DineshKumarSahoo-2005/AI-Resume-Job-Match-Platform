import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfileMenu({ user }) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const menuRef = useRef();

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Close menu when clicking outside
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
        cursor-pointer
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

            <h3 className="font-bold text-lg">{user?.name || "User"}</h3>

            <p className="text-sm text-white/80">
              {user?.email || "user@email.com"}
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
              {user?.role || "Job Seeker"}
            </span>
          </div>

          {/* Menu */}
          <div className="p-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="
              cursor-pointer
                w-full
                text-left
                px-4
                py-3
                rounded-xl
                hover:bg-slate-100
                dark:hover:bg-slate-800
                transition
              "
            >
              📊 Dashboard
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="
              cursor-pointer
                w-full
                text-left
                px-4
                py-3
                rounded-xl
                hover:bg-slate-100
                dark:hover:bg-slate-800
                transition
              "
            >
              👤 My Profile
            </button>

            <button
              onClick={() => navigate("/resume")}
              className="
              cursor-pointer
                w-full
                text-left
                px-4
                py-3
                rounded-xl
                hover:bg-slate-100
                dark:hover:bg-slate-800
                transition
              "
            >
              📄 My Resume
            </button>

            <button
              onClick={() => navigate("/my-applications")}
              className="
              cursor-pointer
                w-full
                text-left
                px-4
                py-3
                rounded-xl
                hover:bg-slate-100
                dark:hover:bg-slate-800
                transition
              "
            >
              📬 Applications
            </button>

            <button
              onClick={() => navigate("/settings")}
              className="
              cursor-pointer
                w-full
                text-left
                px-4
                py-3
                rounded-xl
                hover:bg-slate-100
                dark:hover:bg-slate-800
                transition
              "
            >
              ⚙️ Settings
            </button>

            <hr className="my-3 border-slate-200 dark:border-slate-700" />

            <button
              onClick={logout}
              className="
              cursor-pointer
                w-full
                text-left
                px-4
                py-3
                rounded-xl
                text-red-500
                hover:bg-red-50
                dark:hover:bg-red-900/20
                transition
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

export default ProfileMenu;
