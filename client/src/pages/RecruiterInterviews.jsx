import { useEffect, useState } from "react";
import { getRecruiterInterviews } from "../services/interviewService";

function RecruiterInterviews() {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const data = await getRecruiterInterviews();

      setInterviews(data.interviews);
    } catch (error) {
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">📅 Scheduled Interviews</h1>

      <div className="space-y-5">
        {interviews.map((item) => (
          <div key={item._id} className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold">{item.candidate?.name}</h2>

            <p>{item.candidate?.email}</p>

            <p className="mt-2">
              <strong>Job:</strong> {item.job?.title}
            </p>

            <p>
              <strong>Company:</strong> {item.job?.company}
            </p>

            <p>
              <strong>Date:</strong> {new Date(item.date).toDateString()}
            </p>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecruiterInterviews;
