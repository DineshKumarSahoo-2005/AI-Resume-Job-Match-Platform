function ProductShowcase() {
  const products = [
    {
      title: "Resume Analysis",
      image: "/resume-analysis.png",
      description:
        "Automatically extract skills and identify missing technologies.",
      icon: "📄",
    },
    {
      title: "Job Matching",
      image: "/job-matching.png",
      description:
        "Discover jobs that match your skills instantly.",
      icon: "💼",
    },
    {
      title: "Recruiter Dashboard",
      image: "/recruiter-dashboard.png",
      description:
        "Manage candidates and schedule interviews.",
      icon: "🎯",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white">
          See HireSense AI In Action
        </h2>

        <p className="text-center text-gray-600 dark:text-slate-400 text-lg mb-16">
          Explore the powerful features built into the platform.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {products.map((item, index) => (
            <div
              key={index}
              className="
                group
                bg-white
                dark:bg-slate-800
                rounded-3xl
                overflow-hidden
                shadow-xl
                border
                border-slate-200
                dark:border-slate-700
                hover:-translate-y-3
                hover:shadow-purple-500/20
                transition-all
                duration-300
              "
            >
              <div className="relative">

                <img
                  src={item.image}
                  alt={item.title}
                  className="
                    w-full
                    h-64
                    object-cover
                    group-hover:scale-105
                    transition
                    duration-500
                  "
                />

                <div
                  className="
                    absolute
                    top-4
                    left-4
                    text-4xl
                    bg-white/80
                    dark:bg-slate-900/80
                    backdrop-blur-md
                    p-3
                    rounded-2xl
                  "
                >
                  {item.icon}
                </div>

              </div>

              <div className="p-7">

                <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-slate-300">
                  {item.description}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default ProductShowcase;