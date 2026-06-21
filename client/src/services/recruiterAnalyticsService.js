// recruiterAnalyticsService.js

import axios from "axios";

export const getRecruiterAnalytics =
async () => {

  const token =
    localStorage.getItem("token");

  const res =
    await axios.get(
      "http://localhost:5000/api/analytics/recruiter",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return res.data;
};