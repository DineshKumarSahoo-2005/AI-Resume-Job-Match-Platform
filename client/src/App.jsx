import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import "./App.css";

import Profile from "./pages/Profile";
import Resume from "./pages/Resume";
import Settings from "./pages/Settings";
import AIInsights from "./pages/AIInsights";
import Jobs from "./pages/Jobs";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import PostJob from "./pages/PostJob";
import MyJobs from "./pages/MyJobs";
import Candidates from "./pages/Candidates";
import RecruiterAnalytics from "./pages/RecruiterAnalytics";
import Interviews from "./pages/Interviews";
import InterviewQuestions from "./pages/InterviewQuestions";
import RecruiterInterviews from "./pages/RecruiterInterviews";
import MyApplications from "./pages/MyApplications";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import ProtectedRoute from "./components/ProtectedRoute";
import EditJob from "./pages/EditJob";
import GenerateOffer from "./pages/GenerateOffer";
import MyOffers from "./pages/MyOffers";
import RecruiterOffers from "./pages/RecruiterOffers";
import SearchResults from "./pages/SearchResults";
import RecruiterProfile from "./pages/RecruiterProfile";
import EditRecruiterProfile from "./pages/EditRecruiterProfile";
import RecruiterSettings from "./pages/RecruiterSettings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <Resume />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-insights"
          element={
            <ProtectedRoute>
              <AIInsights />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter-dashboard"
          element={
            <ProtectedRoute>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post-job"
          element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-jobs"
          element={
            <ProtectedRoute>
              <MyJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/candidates/:jobId"
          element={
            <ProtectedRoute>
              <Candidates />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <RecruiterAnalytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interviews"
          element={
            <ProtectedRoute>
              <Interviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview-questions/:jobId"
          element={
            <ProtectedRoute>
              <InterviewQuestions />
            </ProtectedRoute>
          }
        />

        <Route path="/recruiter-interviews" element={<RecruiterInterviews />} />
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/edit-job/:id" element={<EditJob />} />

        <Route
          path="/generate-offer/:candidateId/:jobId"
          element={<GenerateOffer />}
        />

        <Route path="/my-offers" element={<MyOffers />} />

        <Route path="/recruiter-offers" element={<RecruiterOffers />} />

        <Route path="/search" element={<SearchResults />} />

        <Route path="/recruiter-profile" element={<RecruiterProfile />} />

        <Route
          path="/edit-recruiter-profile"
          element={<EditRecruiterProfile />}
        />

        <Route
          path="/recruiter-settings"
          element={
            <ProtectedRoute>
              <RecruiterSettings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
