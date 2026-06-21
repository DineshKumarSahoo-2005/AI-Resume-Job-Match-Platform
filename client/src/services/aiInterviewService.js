import axios from "axios";

const API =
  "http://localhost:5000/api/interview-questions";

export const getInterviewQuestions =
  async (jobId) => {

    const token =
      localStorage.getItem("token");

    const res = await axios.get(
      `${API}/${jobId}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    return res.data;
  };