import { useState } from "react";
import { useParams } from "react-router-dom";
import RecruiterLayout from "../layouts/RecruiterLayout";
import { generateOffer } from "../services/offerService";

import { useNavigate } from "react-router-dom";

function GenerateOffer() {
  const { candidateId, jobId } = useParams();

  const navigate = useNavigate();

  const [joiningDate, setJoiningDate] = useState("");

  const [salaryPackage, setSalaryPackage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await generateOffer({
        candidate: candidateId,
        job: jobId,
        joiningDate,
        package: salaryPackage,
      });

      alert("Offer Letter Generated ✅");

      navigate("/interviews");
    } catch (error) {
      alert("Failed to Generate Offer ❌");
    }
  };

  return (
    <RecruiterLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">📄 Generate Offer Letter</h1>

        <form
          onSubmit={handleSubmit}
          className="
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-8
          "
        >
          <div className="mb-5">
            <label className="block mb-2">Joining Date</label>

            <input
              type="date"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
              className="
              w-full
              p-3
              rounded-xl
              bg-slate-800
              "
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2">Package</label>

            <input
              type="text"
              placeholder="8 LPA"
              value={salaryPackage}
              onChange={(e) => setSalaryPackage(e.target.value)}
              className="
              w-full
              p-3
              rounded-xl
              bg-slate-800
              "
            />
          </div>

          <button
            type="submit"
            className="
            bg-purple-600
            hover:bg-purple-700
            px-6
            py-3
            rounded-xl
            text-white
            "
          >
            Generate Offer
          </button>
        </form>
      </div>
    </RecruiterLayout>
  );
}

export default GenerateOffer;
