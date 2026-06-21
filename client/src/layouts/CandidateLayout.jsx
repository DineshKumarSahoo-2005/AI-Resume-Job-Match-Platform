import CandidateNavbar from "../components/CandidateNavbar";
import Footer from "../components/Footer";
function CandidateLayout({ children }) {
  return (
    <div
      className="
min-h-screen
bg-gradient-to-br
from-slate-50
via-white
to-blue-50
dark:from-[#020617]
dark:via-[#020617]
dark:to-[#0f172a]
text-slate-900
dark:text-white
"
    >
      {/* Background Glow */}
      <div
        className="
  hidden
  dark:block
  absolute
  top-0
  left-0
  w-[500px]
  h-[500px]
  bg-purple-600/20
  blur-[150px]
  rounded-full
"
      />

      <div
        className="
  hidden
  dark:block
  absolute
  bottom-0
  right-0
  w-[500px]
  h-[500px]
  bg-blue-600/20
  blur-[150px]
  rounded-full
"
      />

      <div className="relative z-10">
        <CandidateNavbar />

        <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>

        <Footer />
      </div>
    </div>
  );
}

export default CandidateLayout;
