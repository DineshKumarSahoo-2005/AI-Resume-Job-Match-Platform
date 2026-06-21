import axios from "axios";

const API =
  "http://localhost:5000/api/notifications";

export const getNotifications =
  async () => {

    const token =
      localStorage.getItem("token");

    const res = await axios.get(
      `${API}/my-notifications`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    return res.data;
};

export const markAsRead =
  async (id) => {

    const token =
      localStorage.getItem("token");

    const res = await axios.put(
      `${API}/read/${id}`,
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