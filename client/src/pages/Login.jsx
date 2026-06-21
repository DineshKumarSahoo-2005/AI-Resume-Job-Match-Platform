import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "recruiter") {
        navigate("/recruiter-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#020617]
      relative
      overflow-hidden
      px-6
    "
    >
      {/* Background Glow Effects */}
      <div
        className="
        absolute
        top-0
        left-0
        w-96
        h-96
        bg-purple-600/20
        blur-[120px]
        rounded-full
      "
      />

      <div
        className="
        absolute
        bottom-0
        right-0
        w-96
        h-96
        bg-blue-600/20
        blur-[120px]
        rounded-full
      "
      />

      {/* Login Card */}
      <div
        className="
        relative
        z-10
        w-full
        max-w-md
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        shadow-2xl
        p-8
      "
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <h2
            className="
            text-2xl
            font-bold
            bg-gradient-to-r
            from-blue-500
            to-purple-500
            bg-clip-text
            text-transparent
          "
          >
            HireSense AI 🚀
          </h2>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1
            className="
            text-4xl
            font-extrabold
            bg-gradient-to-r
            from-purple-400
            to-blue-400
            bg-clip-text
            text-transparent
          "
          >
            Welcome Back 👋
          </h1>

          <p className="text-slate-400 mt-2">
            Login to continue your AI career journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
            className="
            w-full
            bg-white/5
            border
            border-slate-700
            text-white
            placeholder:text-slate-400
            p-4
            rounded-xl
            outline-none
            focus:border-purple-500
            focus:ring-2
            focus:ring-purple-500/30
            transition
          "
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              className="
    w-full
    bg-white/5
    border
    border-slate-700
    text-white
    placeholder:text-slate-400
    p-4
    pr-12
    rounded-xl
    outline-none
    focus:border-purple-500
    focus:ring-2
    focus:ring-purple-500/30
    transition
  "
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-slate-400
      hover:text-white
      transition
    "
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-slate-300">
              <input
                type="checkbox"
                className="
  accent-purple-500
  w-4
  h-4
"
              />
              Remember Me
            </label>

            <Link
              to="/forgot-password"
              className="text-purple-400 hover:text-purple-300"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="
            w-full
            p-4
            rounded-xl
            font-semibold
            text-white
            bg-gradient-to-r
            from-purple-600
            to-blue-600
            hover:scale-[1.02]
            hover:shadow-lg
            hover:shadow-purple-500/30
            transition-all
            duration-300
          "
          >
            Login
          </button>
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-700"></div>
            <span className="text-slate-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-slate-700"></div>
          </div>
          <button
            type="button"
            className="
  w-full
  flex
  items-center
  justify-center
  gap-3
  bg-white/10
  border
  border-slate-700
  text-white
  p-4
  rounded-xl
  hover:bg-white/20
  transition
"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              className="w-5 h-5"
              alt=""
            />
            Continue with Google
          </button>
        </form>

        <p className="text-center mt-6 text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="
            text-purple-400
            hover:text-purple-300
            font-medium
            transition
          "
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
