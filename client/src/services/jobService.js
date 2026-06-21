import axios from "axios";

const API = "http://localhost:5000/api/match";

export const getJobMatches = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${API}/jobs`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getRecruiterAnalytics =
  async () => {

    const token =
      localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/jobs/analytics",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  };