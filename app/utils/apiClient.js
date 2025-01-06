// this is done to minimize the code needed to make a http request from any component

import axios from "axios";
import { getAccessToken } from "./auth";

const ApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add a request interceptor to automatically attach the token
ApiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken(); // Get the token from cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ApiClient;
