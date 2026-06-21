function AIInsights({ resumeData }) {
  const skills = resumeData?.skills || [];

  const hasReact = skills.includes("React");
  const hasNode = skills.includes("Node.js");
  const hasMongo = skills.includes("MongoDB");
  const hasExpress = skills.includes("Express");
  const hasTS = skills.includes("TypeScript");

  const isMERN = hasReact && hasNode && hasMongo && hasExpress;

  return (
    <div className=" h-full bg-white dark:bg-white/5 rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none">
      <h2 className="text-2xl font-bold mb-4">🤖 AI Insights</h2>

      <div className="grid gap-3">
        {isMERN && (
          <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
            <h3 className="font-semibold text-green-500">Strong Profile</h3>
            <p>MERN Stack detected in resume</p>
          </div>
        )}

        {hasReact && (
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <h3 className="font-semibold text-blue-500">Recommended Role</h3>
            <p>Frontend Developer (95% match)</p>
          </div>
        )}

        {!hasTS && (
          <div className="p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
            <h3 className="font-semibold text-yellow-500">Skill Gap</h3>
            <p>TypeScript not found in resume</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIInsights;
