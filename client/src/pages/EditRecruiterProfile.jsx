import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import RecruiterLayout from "../layouts/RecruiterLayout";

import { getUserProfile } from "../services/userService";

import { updateProfile } from "../services/profileService";

function EditRecruiterProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    linkedin: "",
    github: "",
    bio: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const user = await getUserProfile();

    setFormData({
      name: user.name || "",
      linkedin: user.linkedin || "",
      github: user.github || "",
      bio: user.bio || "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile(formData);

      localStorage.setItem("user", JSON.stringify(res.user));

      alert("Profile Updated ✅");

      navigate("/recruiter-profile");
    } catch (error) {
      alert("Failed to update profile");
    }
  };

  return (
    <RecruiterLayout>
      <div
        className="
        max-w-3xl
        mx-auto
        bg-white/5
        border border-white/10
        rounded-3xl
        p-8
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          mb-8
          "
        >
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="
            w-full
            bg-slate-800
            p-4
            rounded-xl
            "
          />

          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn URL"
            value={formData.linkedin}
            onChange={handleChange}
            className="
            w-full
            bg-slate-800
            p-4
            rounded-xl
            "
          />

          <input
            type="text"
            name="github"
            placeholder="GitHub URL"
            value={formData.github}
            onChange={handleChange}
            className="
            w-full
            bg-slate-800
            p-4
            rounded-xl
            "
          />

          <textarea
            rows="5"
            name="bio"
            placeholder="About You"
            value={formData.bio}
            onChange={handleChange}
            className="
            w-full
            bg-slate-800
            p-4
            rounded-xl
            "
          />

          <button
            type="submit"
            className="
            px-6
            py-3
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-purple-600
            "
          >
            Save Changes
          </button>
        </form>
      </div>
    </RecruiterLayout>
  );
}

export default EditRecruiterProfile;
