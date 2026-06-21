import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import ProblemSection from "../components/ProblemSection";
import ResumeDemo from "../components/ResumeDemo";
import TechStack from "../components/TechStack";
import GuestProfileMenu from "../components/GuestProfileMenu";
import WhoCanUse from "../components/WhoCanUse";
import Developer from "../components/Developer";
import ProductShowcase from "../components/ProductShowcase";
import AnimatedStats from "../components/AnimatedStats";

function Home() {
  return (
  <>
  
  <Navbar />
  
  <Hero />

  <Features />

  <ResumeDemo />

  <HowItWorks />

  <WhoCanUse />

  <TechStack />

  <AnimatedStats />

  <Footer />
</>
  );
}

export default Home;