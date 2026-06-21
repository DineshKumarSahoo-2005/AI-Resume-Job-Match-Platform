import axios from "axios";

const API =
  "http://localhost:5000/api/applications";

export const getMyApplications =
  async () => {

    const token =
      localStorage.getItem("token");

    const res = await axios.get(
      `${API}/my-applications`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    return res.data;
  };

  export const applyForJob =
  async (jobId) => {

    const token =
      localStorage.getItem("token");

    const res = await axios.post(
      `${API}/apply/${jobId}`,
      {},
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    return res.data;
  };

  export const updateStatus =
  async (
    candidateId,
    jobId,
    status
  ) => {

    const token =
      localStorage.getItem("token");

    const res = await axios.put(
      "http://localhost:5000/api/applications/status",
      {
        candidateId,
        jobId,
        status,
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    return res.data;
  };