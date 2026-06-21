import { useEffect, useState } from "react";
import { searchAll } from "../services/searchService";
import { useNavigate, useSearchParams } from "react-router-dom";

function SearchResults() {
  const [params] = useSearchParams();

  const query = params.get("q");

  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResults();
  }, [query]);

  const fetchResults = async () => {
    try {
      const data = await searchAll(query);
      setResults(data.results);
    } catch (err) {
      return;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="
    mb-8
    px-4
    py-2
    rounded-xl
    bg-white/5
    border
    border-white/10
    text-slate-300
    hover:bg-purple-500/10
    hover:border-purple-500/30
    hover:text-purple-300
    transition
  "
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-5xl font-bold mb-4">
          🔍 Search Results for "{query}"
        </h1>

        <p className="text-slate-400 mb-8">
          {results.length} result{results.length !== 1 ? "s" : ""} found
        </p>

        {results.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-slate-400">No jobs found</h2>

            <p className="text-slate-500 mt-2">
              Try searching for another skill or company.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {results.map((job) => (
              <div
                key={job._id}
                className="
bg-white/5
border border-white/10
rounded-3xl
p-6
w-full
max-w-md
hover:border-purple-500/30
hover:scale-[1.02]
transition-all
duration-300
"
              >
                <h2 className="text-2xl font-bold">{job.title}</h2>

                <p className="text-purple-400 flex items-center gap-2">
                  🏢 {job.company}
                </p>

                <p className="text-slate-400 mt-4">{job.description}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {job.skillsRequired?.map((skill, index) => (
                    <span
                      className={`
    px-3 py-1 rounded-full text-sm
    ${
      skill.toLowerCase() === query.toLowerCase()
        ? "bg-green-500/20 text-green-400 border border-green-500/30"
        : "bg-purple-500/20 text-purple-300"
    }
  `}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-5">
                  <button
                    className="
      w-full
      py-3
      rounded-xl
      bg-gradient-to-r
      from-purple-600
      to-pink-600
      hover:opacity-90
      transition
      font-semibold
    "
                  >
                    View Job
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
