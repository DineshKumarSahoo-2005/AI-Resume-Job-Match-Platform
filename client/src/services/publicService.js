import axios from "axios";

export const getPublicStats =
  async () => {

    const res =
      await axios.get(
        "http://localhost:5000/api/public/stats"
      );

    return res.data;
};