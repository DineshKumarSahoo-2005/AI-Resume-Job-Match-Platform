function WhoCanUse() {
  const users = [
    {
      icon: "🎓",
      title: "Students",
      description:
        "Identify skill gaps before placements and improve your resume.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: "👨‍💻",
      title: "Job Seekers",
      description:
        "Discover jobs that match your current skills and experience.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: "🏢",
      title: "Recruiters",
      description:
        "Find suitable candidates based on skills and job requirements.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: "🚀",
      title: "Freshers",
      description: "Understand industry expectations and prepare accordingly.",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white">
          Who Can Use HireSense AI?
        </h2>

        <p className="text-center text-gray-600 dark:text-slate-300 mb-16 text-lg">
          Built for students, job seekers, recruiters and fresh graduates.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {users.map((user, index) => (
            <div
              key={index}
              className="
                group
                bg-white
                dark:bg-slate-900
                border
                border-slate-200
                dark:border-slate-700
                rounded-3xl
                p-8
                shadow-lg
                hover:-translate-y-3
                hover:shadow-purple-500/20
                transition-all
                duration-300
              "
            >
              <div
                className={`
                  w-20
                  h-20
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  text-4xl
                  mb-6
                  bg-gradient-to-r
                  ${user.color}
                  shadow-lg
                  group-hover:scale-110
                  transition
                `}
              >
                {user.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                {user.title}
              </h3>

              <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                {user.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhoCanUse;
