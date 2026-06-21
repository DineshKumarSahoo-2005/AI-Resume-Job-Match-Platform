import axios from "axios";

const API_URL = "http://localhost:5000/api/search";

export const searchAll = async (query) => {
  const response = await axios.get(
    `${API_URL}?q=${query}`
  );

  return response.data;
};