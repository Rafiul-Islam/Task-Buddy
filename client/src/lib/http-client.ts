import axios from "axios";
import {getSession} from "next-auth/react";

// Create an Axios instance with default settings
const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL, // Use env variables
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add tokens to headers
httpClient.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.user?.accessToken) config.headers['Authorization'] = `Bearer ${session?.user?.accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (e.g., for handling errors)
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

export default httpClient;
