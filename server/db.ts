import axios from "axios";

const api = axios.create({
  baseURL: useRuntimeConfig().API_URL",
  auth: {
    username: useRuntimeConfig().API_USERNAME,
    password: useRuntimeConfig().API_PASSWORD,
  },
});

export default api;
