import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export const getDashboardStats = async () => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(
    `${API_URL}/dashboard-stats`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};