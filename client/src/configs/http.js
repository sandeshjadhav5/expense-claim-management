import axios from "axios";

export const baseURL = "https://tiny-red-abalone-suit.cyclic.app/api/v1";

const http = axios.create({ baseURL });
const access_token = localStorage.getItem("access_token");

http.interceptors.request.use(
  async (config) => {
    if (access_token) {
      config.headers["Authorization"] = `${access_token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle response error
    return Promise.reject(error);
  }
);

export default http;
