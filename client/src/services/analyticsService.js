import axios from "axios";

const API =
  "http://localhost:5000/api/analytics";

export const getRecruiterAnalytics =
  async () => {

    const token =
      localStorage.getItem("token");

    const res = await axios.get(
      `${API}/recruiter`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    return res.data;
  };