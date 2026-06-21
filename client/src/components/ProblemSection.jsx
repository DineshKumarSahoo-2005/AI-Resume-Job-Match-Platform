function ProblemSection() {
  return (
    <section className="py-12 bg-white
dark:bg-slate-700  dark:text-white" id="why">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-4xl font-bold mb-4">
          Why HireSense AI?
        </h2>

        <p className="text-gray-600 dark:text-white mb-12">
          Many candidates apply for jobs without knowing
          whether their skills actually match the requirements.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-red-50 dark:bg-slate-400 p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-3">
              ❌ Resume Rejections
            </h3>

            <p>
              Many resumes get rejected because required
              skills are missing.
            </p>
          </div>

          <div className="bg-yellow-50 dark:bg-slate-400 p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-3">
              ❌ Skill Gaps
            </h3>

            <p>
              Candidates often don't know what skills they
              need to learn next.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-slate-400 p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-3">
              ✅ Smart Matching
            </h3>

            <p>
              HireSense AI helps identify matching jobs and
              missing skills instantly.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default ProblemSection;