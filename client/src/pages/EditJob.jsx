import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../services/jobPostService";
import RecruiterLayout from "../layouts/RecruiterLayout";

function EditJob() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const data = await getJobById(id);

      setTitle(data.job.title);
      setCompany(data.job.company);
      setDescription(data.job.description);
    } catch (error) {
      alert("Failed to load job");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateJob(id, {
        title,
        company,
        description,
      });

      alert("Job Updated Successfully ✅");

      navigate("/my-jobs");
    } catch (error) {
      alert("Update Failed ❌");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold">Loading Job...</h2>
      </div>
    );
  }

  return (
    <RecruiterLayout>
      <button
        onClick={() => navigate("/my-jobs")}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Back to My Jobs
      </button>

      <div
        className="
        max-w-4xl
        mx-auto
        bg-white
        dark:bg-white/5
        rounded-3xl
        p-8
        shadow-lg
        "
      >
        <h1 className="text-4xl font-bold mb-8">✏ Edit Job</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold">Job Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="
              w-full
              p-4
              rounded-xl
              border
              border-slate-300
              dark:bg-white/5
              "
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Company Name</label>

            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="
              w-full
              p-4
              rounded-xl
              border
              border-slate-300
              dark:bg-white/5
              "
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Job Description</label>

            <textarea
              rows="8"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="
              w-full
              p-4
              rounded-xl
              border
              border-slate-300
              dark:bg-white/5
              "
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              "
            >
              💾 Update Job
            </button>

            <button
              type="button"
              onClick={() => navigate("/my-jobs")}
              className="
              bg-gray-500
              hover:bg-gray-600
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </RecruiterLayout>
  );
}

export default EditJob;
