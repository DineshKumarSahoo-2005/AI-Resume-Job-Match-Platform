import axios from "axios";

const API_URL = "http://localhost:5000/api/resume";

export const uploadResume = async (file) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("resume", file);
  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getMyResume = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    "http://localhost:5000/api/resume/my-resume",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
