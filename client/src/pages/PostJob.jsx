import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../services/jobPostService";
import RecruiterLayout from "../layouts/RecruiterLayout";

function PostJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    package: "",
    jobType: "Full Time",
    skills: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createJob({
        title: formData.title,
        company: formData.company,
        location: formData.location,
        package: formData.package,
        jobType: formData.jobType,
        description: formData.description,
        skillsRequired: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      });

      alert("Job Posted Successfully ✅");

      navigate("/recruiter-dashboard");
    } catch (error) {
      alert("Failed to Post Job ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RecruiterLayout>
      <div className="max-w-5xl mx-auto">
        {/* Form Card */}
        <div
          className="
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-8
          shadow-2xl
          "
        >
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold dark:text-white">
              🚀 Post New Job
            </h1>

            <p className="dark:text-slate-400 mt-2">
              Create a new opportunity and attract top talent.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Title */}
            <div>
              <label className="block dark:text-slate-300 mb-2">
                Job Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Frontend Developer"
                required
                className="
                w-full
                px-4
                py-3
                rounded-xl
                bg-neutral-200
                dark:bg-slate-900/70
                border
                border-white/10
                dark:text-white
                focus:border-purple-500
                focus:outline-none
                "
              />
            </div>

            {/* Company + Location */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block dark:text-slate-300 mb-2">
                  Company Name
                </label>

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Wipro"
                  required
                  className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-neutral-200
                  dark:bg-slate-900/70
                  border
                  border-white/10
                  dark:text-white
                  focus:border-purple-500
                  focus:outline-none
                  "
                />
              </div>

              <div>
                <label className="block dark:text-slate-300 mb-2">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Bangalore, India"
                  className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-neutral-200
                  dark:bg-slate-900/70
                  border
                  border-white/10
                  dark:text-white
                  focus:border-purple-500
                  focus:outline-none
                  "
                />
              </div>
            </div>

            {/* Package + Job Type */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block dark:text-slate-300 mb-2">
                  Package
                </label>

                <input
                  type="text"
                  name="package"
                  value={formData.package}
                  onChange={handleChange}
                  placeholder="7 LPA"
                  className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-neutral-200
                  dark:bg-slate-900/70
                  border
                  border-white/10
                  dark:text-white
                  focus:border-purple-500
                  focus:outline-none
                  "
                />
              </div>

              <div>
                <label className="block dark:text-slate-300 mb-2">
                  Job Type
                </label>

                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-neutral-200
                  dark:bg-slate-900/70
                  border
                  border-white/10
                  dark:text-white
                  focus:border-purple-500
                  focus:outline-none
                  "
                >
                  <option>Full Time</option>
                  <option>Internship</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                </select>
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block dark:text-slate-300 mb-2">
                Required Skills
              </label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB, Express"
                className="
                w-full
                px-4
                py-3
                rounded-xl
                bg-neutral-200
                dark:bg-slate-900/70
                border
                border-white/10
                dark:text-white
                focus:border-purple-500
                focus:outline-none
                "
              />

              <p className="text-slate-500 text-sm mt-2">
                Separate skills with commas.
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block dark:text-slate-300 mb-2">
                Job Description
              </label>

              <textarea
                name="description"
                rows="8"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe responsibilities, requirements, and expectations..."
                required
                className="
                w-full
                px-4
                py-3
                rounded-xl
                bg-neutral-200
                dark:bg-slate-900/70
                border
                border-white/10
                dark:text-white
                focus:border-purple-500
                focus:outline-none
                resize-none
                "
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="
              w-full
              cursor-pointer
              py-4
              rounded-2xl
              bg-gray-300
              dark:bg-gradient-to-r
              dark:from-purple-600
              dark:to-pink-600
              dark:text-white
              font-bold
              text-lg
              hover:scale-[1.01]
              transition
              disabled:opacity-50
              "
            >
              {loading ? "Posting Job..." : "🚀 Post Job"}
            </button>
          </form>
        </div>
      </div>
    </RecruiterLayout>
  );
}

export default PostJob;
