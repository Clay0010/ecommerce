import axios from "axios";
import Cookies from "js-cookie";

// Utility to get access token from cookies
const getAccessToken = () => Cookies.get("access_token");

const ApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000, // Optional: set a timeout for requests
});

// Add a request interceptor to attach the token automatically
ApiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    // return Promise.reject(error);
    console.log(error);
  }
);

// Add a response interceptor to handle token expiration and errors
ApiClient.interceptors.response.use(
  (response) => response, // If the response is successful, return it
  async (error) => {
    if (error.response) {
      const { status } = error.response;

      // Handle unauthorized errors
      if (status === 401) {
        console.error("Access token expired or invalid.");

        // Optionally: Redirect to login or show a notification
        window.location.href = "/login";
      }
    }

    // Reject the error to propagate it to the calling code
    return Promise.reject(error);
  }
);

export default ApiClient;
