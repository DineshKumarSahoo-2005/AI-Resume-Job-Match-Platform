import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await registerUser(formData);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {

      alert(error.response?.data?.message || "Registration Failed");
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
      {/* Background Glow */}
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

      {/* Register Card */}
      <div
        className="
        relative
        z-10
        w-full
        max-w-lg
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        shadow-2xl
        p-6
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
            Create Account 🚀
          </h1>

          <p className="text-slate-400 mt-2">
            Start your AI-powered career journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
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

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
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

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
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
            "
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-slate-400
              hover:text-white
            "
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Role */}

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  role: "user",
                })
              }
              className={`
      p-4
      rounded-xl
      border
      transition-all
      ${
        formData.role === "user"
          ? "border-purple-500 bg-purple-500/20"
          : "border-slate-700 bg-white/5"
      }
    `}
            >
              <div className="text-3xl mb-2">👨‍💻</div>

              <p className="font-semibold text-white">Job Seeker</p>
            </button>

            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  role: "recruiter",
                })
              }
              className={`
      p-4
      rounded-xl
      border
      transition-all
      ${
        formData.role === "recruiter"
          ? "border-blue-500 bg-blue-500/20"
          : "border-slate-700 bg-white/5"
      }
    `}
            >
              <div className="text-3xl mb-2">🏢</div>

              <p className="font-semibold text-white">Recruiter</p>
            </button>
          </div>

          {/* Register Button */}
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
            Create Account
          </button>
        </form>

        <p className="text-center mt-6 text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="
            text-purple-400
            hover:text-purple-300
            font-medium
          "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
