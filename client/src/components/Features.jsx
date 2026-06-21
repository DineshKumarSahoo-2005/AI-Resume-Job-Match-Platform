function Features() {
  const features = [
    {
      icon: "📄",
      title: "Resume Parsing",
      description:
        "Automatically extracts skills, technologies, and experience from resumes using AI."
    },
    {
      icon: "🤖",
      title: "AI Job Matching",
      description:
        "Discover jobs that perfectly match your skills, profile, and career goals."
    },
    {
      icon: "📊",
      title: "Skill Gap Analysis",
      description:
        "Identify missing technologies and receive personalized improvement suggestions."
    },
    {
      icon: "🎯",
      title: "Recruiter Dashboard",
      description:
        "Help recruiters discover top candidates based on skills and job requirements."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white">
          Powerful Features
        </h2>

        <p className="text-center text-gray-600 dark:text-slate-300 mb-14 text-lg">
          Everything you need for AI-powered resume analysis and job matching.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="
                group
                bg-white
                dark:bg-slate-900/70
                backdrop-blur-lg
                border
                border-slate-200
                dark:border-slate-700
                rounded-3xl
                p-8
                shadow-lg
                hover:shadow-purple-500/20
                hover:border-purple-500
                group-hover:text-purple-400
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >

              <div className="text-5xl mb-5">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                {feature.title}
              </h3>

              <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                {feature.description}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Features;