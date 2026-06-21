import axios from "axios";

const API_URL =
  "http://localhost:5000/api/users";

export const updateProfile =
  async (profileData) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.put(
        `${API_URL}/update-profile`,
        profileData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};

export const changePassword =
  async (passwordData) => {

    const token =
      localStorage.getItem("token");

    const res = await axios.put(
      "http://localhost:5000/api/users/change-password",
      passwordData,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    return res.data;
  };