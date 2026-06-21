import axios from "axios";

const API = "http://localhost:5000/api/interviews";

export const scheduleInterview = async (data) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${API}/schedule`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getRecruiterInterviews = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${API}/recruiter`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const updateInterviewStatus =
  async (interviewId, status) => {

    const token =
      localStorage.getItem("token");

    const res = await axios.put(
      `${API}/${interviewId}/status`,
      { status },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    return res.data;
  };