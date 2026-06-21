import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getCandidatesForJob } from "../services/matchService";
import RecruiterLayout from "../layouts/RecruiterLayout";
import { updateStatus } from "../services/applicationService";
import { scheduleInterview } from "../services/interviewService";

function Candidates() {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [showInterviewModal, setShowInterviewModal] = useState(false);

  const [selectedCandidateId, setSelectedCandidateId] = useState(null);

  const [interviewDate, setInterviewDate] = useState("");

  const { jobId } = useParams();

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const data = await getCandidatesForJob(jobId);

      setCandidates(data.candidates);
    } catch (error) {
      alert("Failed to load candidates");
    }
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = candidate.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesRole = true;

    return matchesSearch && matchesRole;
  });

  const updateCandidateStatus = (id, newStatus) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.candidateId === id
          ? {
              ...candidate,
              status: newStatus,
            }
          : candidate,
      ),
    );

    if (selectedCandidate && selectedCandidate.candidateId === id) {
      setSelectedCandidate({
        ...selectedCandidate,
        status: newStatus,
      });
    }
  };

  const handleStatusUpdate = async (candidateId, status) => {
    try {
      await updateStatus(candidateId, jobId, status);

      fetchCandidates();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const handleScheduleInterview = async () => {
    try {
      await scheduleInterview({
        candidateId: selectedCandidateId,
        jobId,
        date: interviewDate,
      });

      await handleStatusUpdate(selectedCandidateId, "Interview");

      setShowInterviewModal(false);

      fetchCandidates();

      alert("Interview Scheduled ✅");
    } catch (error) {
      alert("Failed to Schedule");
    }
  };

  return (
    <RecruiterLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">👥 Candidates</h1>
        <p className="text-slate-400 mt-2">
          Manage applicants and hiring process
        </p>
      </div>
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-500/10 p-5 rounded-3xl">
          <h3 className="text-slate-400">Total Candidates</h3>

          <p className="text-3xl font-bold">{candidates.length}</p>
        </div>

        <div className="bg-yellow-500/10 p-5 rounded-3xl">
          <h3 className="text-slate-400">Applied</h3>

          <p className="text-3xl font-bold">
            {candidates.filter((c) => c.status === "Applied").length}
          </p>
        </div>

        <div className="bg-green-500/10 p-5 rounded-3xl">
          <h3 className="text-slate-400">Shortlisted</h3>

          <p className="text-3xl font-bold">
            {candidates.filter((c) => c.status === "Shortlisted").length}
          </p>
        </div>

        <div className="bg-red-500/10 p-5 rounded-3xl">
          <h3 className="text-slate-400">Rejected</h3>

          <p className="text-3xl font-bold">
            {candidates.filter((c) => c.status === "Rejected").length}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-8 mt-5">
        <input
          type="text"
          placeholder="Search candidates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
    flex-1
    p-3
    rounded-xl
    border
    border-slate-300
    dark:bg-white/5
    dark:border-white/10
    "
        />

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="
    p-3
    rounded-xl
    border
    border-slate-300
    dark:bg-white/5
    dark:border-white/10
    "
        >
          <option>All</option>
          <option>Frontend Developer</option>
          <option>Backend Developer</option>
          <option>Data Analyst</option>
        </select>
      </div>

      <div className="grid gap-6">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.candidateId}
            onClick={() => setSelectedCandidate(candidate)}
            className="
  cursor-pointer
  bg-white
  dark:bg-white/5
  border
  border-white/10
  rounded-3xl
  p-6
  shadow-sm
  hover:scale-[1.01]
  transition
  "
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">👤 {candidate.name}</h2>

                <p className="text-slate-400">Candidate Match Analysis</p>
                <div className="mt-2">
                  <span
                    className={`
      px-3
      py-1
      rounded-full
      text-sm
      font-medium

      ${
        candidate.status === "Applied"
          ? "bg-yellow-500/20 text-yellow-500"
          : candidate.status === "Shortlisted"
            ? "bg-green-500/20 text-green-500"
            : candidate.status === "Interview"
              ? "bg-blue-500/20 text-blue-500"
              : candidate.status === "Rejected"
                ? "bg-red-500/20 text-red-500"
                : "bg-purple-500/20 text-purple-500"
      }
    `}
                  >
                    {candidate.status}
                  </span>
                </div>
              </div>

              <div
                className="
                bg-green-500/20
                text-green-500
                px-4
                py-2
                rounded-full
                font-bold
                "
              >
                {candidate.matchScore}% Match
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {candidate.matchingSkills?.map((skill) => (
                <span
                  key={skill}
                  className="
                  px-3
                  py-1
                  bg-purple-500/10
                  text-purple-500
                  rounded-full
                  text-sm
                  "
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    `http://localhost:5000/${candidate.resumeFile}`,
                    "_blank",
                  );
                }}
                className="
  px-4
  py-2
  bg-blue-500
  text-white
  rounded-xl
  "
              >
                Resume
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();

                  handleStatusUpdate(candidate.candidateId, "Shortlisted");
                }}
                className="
  px-4
  py-2
  rounded-xl
  bg-green-500
  text-white
  "
              >
                Shortlist
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();

                  handleStatusUpdate(candidate.candidateId, "Rejected");
                }}
                className="
  px-4
  py-2
  rounded-xl
  bg-red-500
  text-white
  "
              >
                Reject
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();

                  setSelectedCandidateId(candidate.candidateId);

                  setShowInterviewModal(true);
                }}
                className="
  px-4
  py-2
  rounded-xl
  bg-blue-500
  text-white
  "
              >
                Interview
              </button>
            </div>
          </div>
        ))}
      </div>
      {filteredCandidates.length === 0 && (
        <div
          className="
    text-center
    py-12
    rounded-3xl
    bg-white
    dark:bg-white/5
    "
        >
          <h2 className="text-2xl font-bold">No Candidates Found</h2>

          <p className="text-slate-400 mt-2">Try another search term</p>
        </div>
      )}
      {selectedCandidate && (
        <div
          onClick={() => setSelectedCandidate(null)}
          className="
  fixed
  inset-0
  bg-black/50
  flex
  justify-center
  items-center
  z-50
  "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
      bg-white
      dark:bg-slate-900
      rounded-3xl
      p-8
      w-[90%]
      max-w-2xl
max-h-[90vh]
overflow-y-auto
      "
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">
                👤 {selectedCandidate.name}
              </h2>

              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-2xl"
              >
                ✖
              </button>
            </div>

            <div className="space-y-3">
              <p>
                <strong>Role:</strong> {selectedCandidate.role}
              </p>

              <p>
                <strong>Email:</strong> {selectedCandidate.email}
              </p>

              <p>
                <strong>Email:</strong>
                {selectedCandidate.email}
              </p>

              <p>
                <strong>Match Score:</strong>
                {selectedCandidate.matchScore}%
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className="
    px-3
    py-1
    rounded-full
    bg-blue-500/20
    text-blue-500
  "
                >
                  {selectedCandidate.status}
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {selectedCandidate.matchingSkills?.map((skill) => (
                <span
                  key={skill}
                  className="
            px-3
            py-1
            rounded-full
            bg-purple-500/10
            text-purple-500
            "
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="font-bold mb-3">Resume Preview</h3>

              <iframe
                src={`http://localhost:5000/${selectedCandidate.resumeFile}`}
                title="Resume"
                className="
  w-full
  h-[500px]
  rounded-xl
  border
  "
              />
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <button
                className="
          px-4
          py-2
          bg-blue-500
          text-white
          rounded-xl
          "
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Resume
              </button>
              <a
                href={`http://localhost:5000/${selectedCandidate.resumeFile}`}
                download
                target="_blank"
                rel="noreferrer"
                className="
  px-4
  py-2
  bg-indigo-500
  text-white
  rounded-xl
  "
              >
                Download Resume
              </a>

              <button
                className="
          px-4
          py-2
          bg-green-500
          text-white
          rounded-xl
          "
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusUpdate(
                    selectedCandidate.candidateId,
                    "Shortlisted",
                  );
                }}
              >
                Shortlist
              </button>

              <button
                className="
          px-4
          py-2
          bg-red-500
          text-white
          rounded-xl
          "
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusUpdate(selectedCandidate.candidateId, "Rejected");
                }}
              >
                Reject
              </button>

              <button
                className="
          px-4
          py-2
          bg-purple-500
          text-white
          rounded-xl
          "
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCandidateId(selectedCandidate.candidateId);
                  setShowInterviewModal(true);
                }}
              >
                Interview
              </button>
            </div>
          </div>
        </div>
      )}
      {showInterviewModal && (
        <div
          className="
fixed
inset-0
bg-black/50
flex
items-center
justify-center
z-50
"
        >
          <div
            className="
bg-white
dark:bg-slate-900
rounded-3xl
p-8
w-[400px]
"
          >
            <h2
              className="
text-2xl
font-bold
mb-4
"
            >
              📅 Schedule Interview
            </h2>

            <input
              type="date"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
              className="
w-full
border
rounded-xl
p-3
mb-4
"
            />

            <div
              className="
flex
gap-3
"
            >
              <button
                onClick={handleScheduleInterview}
                className="
flex-1
bg-purple-600
text-white
py-3
rounded-xl
"
              >
                Schedule
              </button>

              <button
                onClick={() => setShowInterviewModal(false)}
                className="
flex-1
bg-gray-300
dark:text-black
py-3
rounded-xl
"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </RecruiterLayout>
  );
}

export default Candidates;
