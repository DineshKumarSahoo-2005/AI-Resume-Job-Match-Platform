import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email },
      );

      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
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
          mb-4
        "
        >
          Forgot Password
        </h1>

        <p
          className="
          text-center
          text-slate-400
          mb-8
        "
        >
          Enter your email to receive a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
