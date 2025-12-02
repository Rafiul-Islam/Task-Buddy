import axios from "axios";
import {getSession} from "next-auth/react";
import {ApiResponse} from "@/types/auth";

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
    return httpClient.get<ApiResponse<T[]>>(this.apiEndPoint, {validateStatus: () => true})
    .then(res => res.data);
  }

  getOne = (id: number) => {
    return httpClient.get<ApiResponse<T>>(`${this.apiEndPoint}/${id}`, {validateStatus: () => true})
    .then(res => res.data);
  }

  post = (data: T) => {
    return httpClient.post<ApiResponse<T>>(this.apiEndPoint, data, {validateStatus: () => true})
    .then(res => res.data);
  }

  put = (id: number, data: T) => {
    return httpClient.put<ApiResponse<T>>(`${this.apiEndPoint}/${id}`, data, {validateStatus: () => true})
    .then(res => res.data);
  }

  delete = (id: number) => {
    return httpClient.delete<ApiResponse<void>>(`${this.apiEndPoint}/${id}`, {validateStatus: () => true})
    .then(res => res.data);
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
