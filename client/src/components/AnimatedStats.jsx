import { useEffect, useState } from "react";

import { getPublicStats } from "../services/publicService";

function AnimatedStats() {
  const [stats, setStats] = useState(null);
  const statsData = [
    {
      value: stats?.totalUsers || 0,
      label: "Users",
      color: "from-blue-500 to-cyan-500",
      icon: "👥",
    },
    {
      value: stats?.totalJobs || 0,
      label: "Jobs Posted",
      color: "from-purple-500 to-pink-500",
      icon: "💼",
    },
    {
      value: stats?.totalApplications || 0,
      label: "Applications",
      color: "from-green-500 to-emerald-500",
      icon: "📨",
    },
    {
      value: stats?.totalResumes || 0,
      label: "Resumes Uploaded",
      color: "from-orange-500 to-red-500",
      icon: "📄",
    },
  ];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getPublicStats();

      setStats(data);
    } catch (error) {
      setStats({
        totalUsers: 0,
        totalJobs: 0,
        totalApplications: 0,
        totalResumes: 0,
      });
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white">
          Trusted By Future Professionals
        </h2>

        <p className="text-center text-gray-600 dark:text-slate-400 mb-16 text-lg">
          Helping candidates analyze resumes and discover opportunities faster.
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="
                bg-white
                dark:bg-slate-800
                rounded-3xl
                p-8
                text-center
                shadow-lg
                border
                border-slate-200
                dark:border-slate-700
                hover:-translate-y-3
                hover:shadow-purple-500/20
                transition-all
                duration-300
              "
            >
              <div className="text-5xl mb-4">{stat.icon}</div>

              <h3
                className={`
                  text-5xl
                  font-extrabold
                  mb-3
                  bg-gradient-to-r
                  ${stat.color}
                  bg-clip-text
                  text-transparent
                `}
              >
                {stat.value}
              </h3>

              <p className="text-gray-600 dark:text-slate-300 text-lg">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AnimatedStats;
