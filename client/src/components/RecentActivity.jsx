function RecentActivity() {
  const activities = [
    {
      icon: "📄",
      title: "Resume Uploaded Successfully",
      time: "2 hours ago",
    },
    {
      icon: "🎯",
      title: "Applied to Frontend Developer at TCS",
      time: "Yesterday",
    },
    {
      icon: "🤖",
      title: "AI Resume Analysis Generated",
      time: "Yesterday",
    },
    {
      icon: "👤",
      title: "Profile Updated",
      time: "2 days ago",
    },
  ];

  return (
    <div
      className="
      mt-6

      bg-white
      dark:bg-white/5

      border
      border-slate-200
      dark:border-white/10

      rounded-3xl
      p-6

      shadow-lg
      dark:shadow-none
    "
    >
      <h2 className="text-2xl font-bold mb-6">📈 Recent Activity</h2>

      <div className="space-y-3">
        {activities.map((item, index) => (
          <div
            key={index}
            className="
            flex
            items-start
            gap-4

            p-3

            rounded-2xl

            hover:bg-slate-100
            dark:hover:bg-white/5

            transition
          "
          >
            <div className="text-2xl">{item.icon}</div>

            <div>
              <h3 className="font-semibold">{item.title}</h3>

              <p className="text-sm text-slate-500">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
