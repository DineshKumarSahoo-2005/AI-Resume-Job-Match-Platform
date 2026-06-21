import axios from "axios";

const API =
  "http://localhost:5000/api/offers";

export const generateOffer =
  async (offerData) => {

    const token =
      localStorage.getItem("token");

    const res = await axios.post(
      `${API}/generate`,
      offerData,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    return res.data;
  };

  export const getMyOffers =
  async () => {

    const token =
      localStorage.getItem("token");

    const res = await axios.get(
      `${API}/my-offers`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    return res.data;
  };

  export const updateOfferStatus =
  async (offerId, status) => {

    const token =
      localStorage.getItem("token");

    const res = await axios.put(
      `${API}/${offerId}/status`,
      { status },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    return res.data;
  };

  export const getRecruiterOffers =
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