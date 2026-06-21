import axios from "axios";

const API = "http://localhost:5000/api/jobs";

export const createJob = async (jobData) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${API}/create`,
    jobData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getMyJobs = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${API}/my-jobs`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const deleteJob = async (id) => {
  const token = localStorage.getItem("token");

  const res = await axios.delete(
    `${API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getJobById = async (id) => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const updateJob = async (
  id,
  jobData
) => {
  const token = localStorage.getItem("token");

  const res = await axios.put(
    `${API}/${id}`,
    jobData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};