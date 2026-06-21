import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInterviewQuestions } from "../services/aiInterviewService";
import CandidateLayout from "../layouts/CandidateLayout";

function InterviewQuestions() {
  const { jobId } = useParams();

  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await getInterviewQuestions(jobId);

      setQuestions(data.questions || []);
    } catch (error) {
      alert("Failed to fetch Questions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CandidateLayout>
      {/* Header */}

      <div className="mb-10">
        <button
          onClick={() => navigate(-1)}
          className="
          mb-6
          text-purple-400
          hover:text-purple-300
          transition
        "
        >
          ← Back to Jobs
        </button>

        <h1
          className="
          text-5xl
          font-bold
          dark:text-white
          flex
          items-center
          gap-3
        "
        >
          🧠 AI Interview Questions
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          Practice questions generated specifically for this role
        </p>
      </div>

      {/* Loading */}

      {loading ? (
        <div
          className="
          bg-neutral-100
          dark:bg-white/5
          border
          border-white/10
          rounded-3xl
          p-10
          text-center
          "
        >
          <h2 className="text-xl dark:text-white">Generating Questions...</h2>
        </div>
      ) : questions.length === 0 ? (
        <div
          className="
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-10
          text-center
          "
        >
          <h2 className="text-2xl font-bold dark:text-white">
            No Questions Available
          </h2>

          <p className="text-slate-400 mt-2">Try again later.</p>
        </div>
      ) : (
        <>
          {/* Stats Card */}

          <div
            className="
            bg-gradient-to-r
            from-purple-500/10
            to-blue-500/10
            border
            border-white/10
            rounded-3xl
            p-6
            mb-8
            "
          >
            <p className="text-slate-400">Total Questions</p>

            <h2 className="text-5xl font-bold text-purple-400 mt-2">
              {questions.length}
            </h2>
          </div>

          {/* Questions */}

          <div className="grid gap-5">
            {questions.map((question, index) => (
              <div
                key={index}
                className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-6
                backdrop-blur-xl
                hover:border-purple-500/30
                hover:scale-[1.01]
                transition-all
                duration-300
                "
              >
                <div className="flex items-start gap-4">
                  <div
                    className="
                    min-w-[50px]
                    h-[50px]
                    rounded-2xl
                    bg-gradient-to-r
                    from-purple-600
                    to-pink-600
                    flex
                    items-center
                    justify-center
                    dark:text-white
                    font-bold
                    "
                  >
                    {index + 1}
                  </div>

                  <div>
                    <h2
                      className="
                      text-lg
                      dark:text-white
                      leading-relaxed
                      "
                    >
                      {question}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Card */}

          <div
            className="
            mt-10
            bg-gradient-to-r
            from-purple-500/10
            to-pink-500/10
            border
            border-white/10
            rounded-3xl
            p-6
            "
          >
            <h2 className="text-xl font-bold dark:text-white">
              💡 Interview Tip
            </h2>

            <p className="text-slate-300 mt-3">
              Don't memorize answers. Focus on explaining your thought process,
              real project experience, and problem-solving approach.
            </p>
          </div>
        </>
      )}
    </CandidateLayout>
  );
}

export default InterviewQuestions;
