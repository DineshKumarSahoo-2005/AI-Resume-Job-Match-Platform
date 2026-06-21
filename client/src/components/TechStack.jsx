function TechStack() {
  const technologies = [
    {
      icon: "⚛",
      name: "React",
      category: "Frontend",
    },
    {
      icon: "🎨",
      name: "Tailwind CSS",
      category: "Styling",
    },
    {
      icon: "🟢",
      name: "Node.js",
      category: "Backend",
    },
    {
      icon: "🚀",
      name: "Express.js",
      category: "API Server",
    },
    {
      icon: "🍃",
      name: "MongoDB",
      category: "Database",
    },
    {
      icon: "🔐",
      name: "JWT",
      category: "Authentication",
    },
    {
      icon: "📂",
      name: "Multer",
      category: "File Uploads",
    },
    {
      icon: "📄",
      name: "PDF Parse",
      category: "Resume Parsing",
    },
  ];

  return (
    <section
      id="tech"
      className="
    py-24
    bg-gradient-to-r
    from-blue-50
    to-purple-50

    dark:from-slate-900
    dark:to-slate-900
  "
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white">
          Built With Modern Technologies ⚡
        </h2>

        <p className="text-center text-gray-600 dark:text-slate-300 mb-16 text-lg">
          Powered by a modern MERN stack and AI-driven architecture.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
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
                text-center
              "
            >
              <div
                className="
                  text-5xl
                  mb-5
                  group-hover:scale-110
                  transition
                "
              >
                {tech.icon}
              </div>

              <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
                {tech.name}
              </h3>

              <p className="text-gray-600 dark:text-slate-300">
                {tech.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStack;
