import axios from "axios";

const BASE_API_URL = `http://localhost:8001/api/v1`;

const ApiQuery = {
  getAllCategories: async () => {
    const resp = await axios.get(`${BASE_API_URL}/getAllCategories`);

    return resp?.data;
  },

  getAllEmployees: async () => {
    const resp = await axios.get(`${BASE_API_URL}/getAllEmplyees`);

    return resp?.data;
  },

  castVote: async (formData) => {
    const resp = await axios.post(`${BASE_API_URL}/voteCategory`, formData);

    return resp?.data;
  },
  getUserVotes: async (email) => {
    const resp = await axios.get(`${BASE_API_URL}/getUserVotes/${email}`);

    return resp?.data;
  },

  getAllVotes: async () => {
    const resp = await axios.get(`${BASE_API_URL}/getAllVotes`);

    return resp?.data;
  }
};

export default ApiQuery;
