import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-purple-600 to-fuchsia-600 text-white dark:from-slate-900
dark:via-slate-800
dark:to-black"
    >
      {/* Background Blur Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE */}
          <div>
            <h1
              className="
  text-5xl md:text-6xl
  lg:text-8xl
  font-extrabold
  leading-none
  tracking-tight
  text-white
  "
            >
              Find Your Perfect Job
              <span
                className="
    block
    mt-4
    text-[#FFD93D]
    drop-shadow-[0_0_25px_rgba(255,217,61,0.7)]
    "
              >
                With AI
              </span>
            </h1>

            {/* Description */}
            <p
              className="
  text-2xl
  text-white/90
  leading-relaxed
  max-w-2xl
  mt-8
  "
            >
              Analyze resumes, discover skill gaps, get personalized job
              recommendations, and prepare for interviews using AI.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-5 mb-10">
              <Link to="/register">
                <button
                  className="
                  cursor-pointer
bg-white
text-[#4F46E5]
font-bold
px-8
py-4
rounded-2xl
shadow-[0_15px_35px_rgba(255,255,255,0.3)]
hover:scale-105
transition
"
                >
                  Get Started Free
                </button>
              </Link>

              <button
                onClick={() =>
                  document.getElementById("why")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="
                cursor-pointer
border
border-white/50
bg-white/10
backdrop-blur-md
text-white
px-8
py-4
rounded-2xl
hover:bg-white/20
transition
"
              >
                Learn More
              </button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-5 text-lg">
              <span>✅ Resume Analysis</span>

              <span>✅ Job Matching</span>

              <span>✅ Skill Gap Detection</span>

              <span>✅ AI Interview Questions</span>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative">
            {/* Glow Behind Image */}
            <div
              className="
              absolute
              inset-0
              bg-white/10
              blur-3xl
              rounded-full
            "
            ></div>

            <div
              className="
  relative
  bg-white/10
  backdrop-blur-lg
  border border-white/20
  rounded-3xl
  p-4
  shadow-2xl
  hover:scale-105
  transition
  duration-500
  "
            >
              <img
                src="/hero1.png"
                alt="AI Resume Analysis"
                className="rounded-2xl float"
              />
            </div>
          </div>
        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-8 mt-24 text-center">
          <div>
            <h2 className="text-5xl font-bold">95%</h2>

            <p className="text-gray-200 mt-2">Match Accuracy</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">AI</h2>

            <p className="text-gray-200 mt-2">Powered Analysis</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">24/7</h2>

            <p className="text-gray-200 mt-2">Smart Recommendations</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
