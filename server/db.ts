import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL,
  auth: {
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
  },
});

export default api;
