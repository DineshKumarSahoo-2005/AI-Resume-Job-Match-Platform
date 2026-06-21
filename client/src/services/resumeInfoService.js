import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export const getMyResume = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/my-resume`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};