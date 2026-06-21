import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password },
      );

      alert(res.data.message);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Reset Failed");
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
      px-6
    "
    >
      <div
        className="
        w-full
        max-w-md
        bg-white/5
        backdrop-blur-xl
        border
        border-white/10
        rounded-3xl
        p-8
      "
      >
        <h1
          className="
          text-4xl
          font-bold
          text-center
          text-white
          mb-6
        "
        >
          Reset Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              w-full
              p-4
              rounded-xl
              bg-white/5
              border
              border-slate-700
              text-white
            "
          />

          <button
            type="submit"
            className="
              w-full
              p-4
              rounded-xl
              text-white
              bg-gradient-to-r
              from-purple-600
              to-blue-600
            "
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
