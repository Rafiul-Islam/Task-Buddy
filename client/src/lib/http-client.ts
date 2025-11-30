import axios from "axios";
import {getSession} from "next-auth/react";
import {ApiResponse} from "@/types/auth";

// Create an Axios instance with default settings
export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL, // Use env variables
  headers: {
    "Content-Type": "application/json",
  },
});

export class ApiClient<T> {
  apiEndPoint = '';

  constructor(apiEndPoint: string) {
    this.apiEndPoint = apiEndPoint;
  }

  getAll = () => {
    return httpClient.get<ApiResponse<T[]>>(this.apiEndPoint).then(res => res.data.payload);
  }

  getOne = (id: string) => {
    return httpClient.get<ApiResponse<T>>(`${this.apiEndPoint}/${id}`).then(res => res.data.payload);
  }

  post = (data: T) => {
    return httpClient.post<ApiResponse<T>>(this.apiEndPoint, data).then(res => res.data.payload);
  }

  put = (id: string, data: T) => {
    return httpClient.put<ApiResponse<T>>(`${this.apiEndPoint}/${id}`, data).then(res => res.data.payload);
  }

  delete = (id: string) => {
    return httpClient.delete<ApiResponse<void>>(`${this.apiEndPoint}/${id}`).then(res => res.data.payload);
  }
}

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
