import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="bg-gray-900 
      bg-white
      dark:bg-[#07152f]
        border-t
      border-slate-200
      dark:border-white/10 text-slate-700
      dark:text-slate-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">HireSense AI 🚀</h2>

            <p className="text-gray-400">
              AI-powered Resume Analysis and Job Matching Platform built to help
              candidates understand their skills, identify gaps, and discover
              suitable jobs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/login">Login</Link>
              </li>

              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>

            <ul className="space-y-2 text-gray-400">
              <li>Resume Parsing</li>
              <li>Job Matching</li>
              <li>Skill Gap Analysis</li>
              <li>Recruiter Dashboard</li>
            </ul>
          </div>

          {/* About Creator */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Creator</h3>

            <p className="text-gray-400">Dinesh Kumar Sahoo</p>

            <p className="text-gray-400">Java Full Stack Developer</p>

            <p className="text-gray-400">AI & Data Science Enthusiast</p>

            <div className="mt-4 space-y-2">
              <a
                href="https://github.com/DineshKumarSahoo-2005"
                target="_blank"
                rel="noreferrer"
                className="block text-blue-400 hover:text-blue-300"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/dinesh-kumar-sahoo-260623294/"
                target="_blank"
                rel="noreferrer"
                className="block text-blue-400 hover:text-blue-300"
              >
                LinkedIn
              </a>

              <a
                href="mailto:dineshkumarsahoo30776@gmail.com"
                className="block text-blue-400 hover:text-blue-300"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <div className="text-center text-gray-500">
          © 2026 HireSense AI. Built by Dinesh Kumar Sahoo.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
