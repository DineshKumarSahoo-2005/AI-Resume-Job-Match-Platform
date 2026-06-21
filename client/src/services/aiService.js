import axios from "axios";

const API = "http://localhost:5000/api/ai";

export const getResumeInsights = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${API}/resume-insights`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};