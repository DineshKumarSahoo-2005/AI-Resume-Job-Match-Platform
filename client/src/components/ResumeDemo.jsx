function ResumeDemo() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white">
          Example Analysis 📄
        </h2>

        <p className="text-center text-gray-600 dark:text-slate-300 mb-14 text-lg">
          See how HireSense AI analyzes resumes and provides actionable
          insights.
        </p>

        <div
          className="
            bg-white
            dark:bg-slate-900
            border
            border-slate-200
            dark:border-slate-700
            rounded-3xl
            shadow-2xl
            p-8
            max-w-5xl
            mx-auto
          "
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                Frontend Developer Resume
              </h3>

              <p className="text-gray-500 mt-2">AI Resume Analysis Report</p>
            </div>

            <div
              className="
              mt-4 md:mt-0
              bg-green-500/20
              text-green-400
              px-5 py-3
              rounded-full
              font-bold
            "
            >
              Resume Score 75%
            </div>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="font-semibold dark:text-white">Match Score</span>

              <span className="font-bold text-green-500">75%</span>
            </div>

            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4">
              <div
                className="
                  bg-gradient-to-r
                  from-green-400
                  to-green-600
                  h-4
                  rounded-full
                  w-[75%]
                "
              />
            </div>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Skills */}
            <div>
              <h4 className="font-bold text-xl mb-4 dark:text-white">
                Skills Detected
              </h4>

              <div className="flex gap-3 flex-wrap">
                {["Java", "React", "JavaScript", "HTML"].map((skill) => (
                  <span
                    key={skill}
                    className="
                      bg-green-500/15
                      text-green-400
                      px-4
                      py-2
                      rounded-full
                    "
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing */}
            <div>
              <h4 className="font-bold text-xl mb-4 dark:text-white">
                Missing Skills
              </h4>

              <span
                className="
                  bg-red-500/15
                  text-red-400
                  px-4
                  py-2
                  rounded-full
                "
              >
                ⚠ MongoDB
              </span>
            </div>
          </div>

          {/* Recommendation */}
          <div
            className="
              mt-8
              bg-purple-500/10
              border
              border-purple-500/30
              rounded-2xl
              p-5
            "
          >
            <h4 className="font-bold text-lg text-purple-400 mb-2">
              🎯 Recommended Role
            </h4>

            <p className="text-xl font-semibold dark:text-white">
              Frontend Developer
            </p>
          </div>

          {/* AI Suggestions */}
          <div
            className="
              mt-6
              bg-slate-100
              dark:bg-slate-800
              rounded-2xl
              p-5
            "
          >
            <h4 className="font-bold mb-3 dark:text-white">
              🤖 AI Suggestions
            </h4>

            <ul className="space-y-2 text-gray-600 dark:text-slate-300">
              <li>• Learn MongoDB fundamentals</li>

              <li>• Build one MERN stack project</li>

              <li>• Improve backend development skills</li>

              <li>• Add REST API experience to resume</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResumeDemo;
