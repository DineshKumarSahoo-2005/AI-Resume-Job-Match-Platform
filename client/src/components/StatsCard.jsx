function StatsCards({ resumeData, totalSkills, matches, totalMissingSkills }) {
  const cards = [
    {
      title: "Resume",
      value: resumeData ? "Uploaded" : "Missing",
      icon: "📄",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Skills",
      value: totalSkills,
      icon: "🛠",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Job Matches",
      value: matches.length,
      icon: "🎯",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Missing Skills",
      value: totalMissingSkills,
      icon: "⚠",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6 mt-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="
          bg-white
dark:bg-white/5
border
border-slate-200
dark:border-white/10
shadow-md
          backdrop-blur-xl
          rounded-3xl
          p-6
          hover:scale-105
          transition
        "
        >
          <div className="text-4xl mb-3">{card.icon}</div>

          <p
            className="text-slate-600
dark:text-slate-400"
          >
            {card.title}
          </p>

          <h2
            className={`
            text-3xl
            font-bold
            mt-2
            bg-gradient-to-r
            ${card.color}
            bg-clip-text
            text-transparent
          `}
          >
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
