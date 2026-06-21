import axios from "axios";

const API = "http://localhost:5000/api/match";

export const getMatches = async () => {
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

export const getCandidatesForJob = async (jobId) => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${API}/job/${jobId}/candidates`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

