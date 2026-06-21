import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "My Profile",
      icon: "👤",
      path: "/profile",
    },
    {
      title: "Resume",
      icon: "📄",
      path: "/resume",
    },
    {
      title: "Jobs",
      icon: "💼",
      path: "/jobs",
    },
    {
      title: "Applications",
      icon: "📨",
      path: "/my-applications",
    },
    {
      title: "Insights",
      icon: "🤖",
      path: "/ai-insights",
    },
    {
      title: "Settings",
      icon: "⚙",
      path: "/settings",
    },
  ];

  return (
    <div
      className="
      mt-8
      bg-white/5
      backdrop-blur-xl
      border
      border-white/10
      rounded-3xl
      p-6
    "
    >
      <h2 className="text-2xl font-bold mb-6">⚡ Quick Actions</h2>

      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => navigate(action.path)}
            className="
            cursor-pointer
            bg-white/5
            bg-white
dark:bg-white/5
border
border-slate-200
dark:border-white/10
            rounded-2xl
            p-5
            hover:bg-white/10
            hover:scale-105
            transition
          "
          >
            <div className="text-4xl mb-3">{action.icon}</div>

            <p className="font-semibold">{action.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;
