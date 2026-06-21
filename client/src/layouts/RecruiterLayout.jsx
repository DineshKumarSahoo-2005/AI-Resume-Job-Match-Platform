import RecruiterNavbar from "../components/RecruiterNavbar";
import Footer from "../components/Footer";

function RecruiterLayout({ children }) {
  return (
    <div
      className="
      min-h-screen
      bg-slate-50
      dark:bg-[#0B1120]
      text-slate-900
      dark:text-white
      transition-all
      duration-300
    "
    >
      <RecruiterNavbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default RecruiterLayout;