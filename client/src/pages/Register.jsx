import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Registration Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      console.log(error.response);
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account 🚀
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
