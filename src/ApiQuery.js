import axios from "axios";
import { graphConfig } from "./auth.Config";

const BASE_API_URL = `https://voting-api.fasset.org.za/api/v1`;

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
  },

  getResults: async (categoryId) => {
    const resp = await axios.get(`${BASE_API_URL}/results/${categoryId}`);

    return resp?.data;
  },
  getUserInfo: async (accessToken) => {
    const resp = await axios.get(graphConfig.graphMeEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return resp?.data;
  }
};

export default ApiQuery;
