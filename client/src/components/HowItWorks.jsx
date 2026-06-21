function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: "📄",
      title: "Upload Resume",
      description:
        "Upload your PDF resume securely and let HireSense AI begin the analysis."
    },
    {
      number: "02",
      icon: "🤖",
      title: "Analyze Resume",
      description:
        "AI scans your experience, projects, education, and technical skills."
    },
    {
      number: "03",
      icon: "🛠️",
      title: "Extract Skills",
      description:
        "Technologies and competencies are automatically detected and categorized."
    },
    {
      number: "04",
      icon: "🎯",
      title: "Match Jobs",
      description:
        "Relevant jobs are matched based on your profile and skill set."
    },
    {
      number: "05",
      icon: "📊",
      title: "Get Results",
      description:
        "Receive match scores, missing skills, recommendations, and insights."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-slate-900">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white">
          How It Works
        </h2>

        <p className="text-center text-gray-600 dark:text-slate-300 mb-16 text-lg">
          A simple 5-step AI-powered workflow.
        </p>

        <div className="grid md:grid-cols-5 gap-6">

          {steps.map((step, index) => (
            <div
              key={index}
              className="
                relative
                group
                bg-white
                dark:bg-slate-900
                border
                border-slate-200
                dark:border-slate-700
                rounded-3xl
                p-6
                shadow-lg
                hover:-translate-y-3
                hover:shadow-purple-500/20
                transition-all
                duration-300
              "
            >

              {/* Step Number */}
              <div
                className="
                  absolute
                  -top-4
                  left-1/2
                  -translate-x-1/2
                  bg-gradient-to-r
                  from-purple-600
                  to-blue-600
                  text-white
                  text-sm
                  font-bold
                  px-4
                  py-1
                  rounded-full
                "
              >
                {step.number}
              </div>

              <div className="text-5xl text-center mt-4 mb-4">
                {step.icon}
              </div>

              <h3 className="text-xl font-bold text-center mb-3 text-slate-900 dark:text-white">
                {step.title}
              </h3>

              <p className="text-center text-gray-600 dark:text-slate-300 leading-relaxed">
                {step.description}
              </p>

              {/* Arrow Connector */}
              {index < steps.length - 1 && (
                <div
                  className="
                    hidden
                    md:block
                    absolute
                    top-1/2
                    -right-5
                    text-purple-500
                    text-3xl
                    font-bold
                  "
                >
                  →
                </div>
              )}
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;