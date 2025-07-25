import axios from "axios";
import { clearToken } from "@/features/auth/auth-slice";
import {store} from "../features/store"; // ✅ Make sure this path matches your actual store file

const dispatch = store.dispatch;

// Create a custom Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token from localStorage to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token errors in response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.message === "No token"
    ) {
      localStorage.removeItem("token");
      dispatch(clearToken());
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// API service wrapper
const apiService = {
  get: (url, params = {}, config = {}) =>
    axiosInstance.get(url, {
      ...config,
      params,
    }),

  post: (url, data = {}, config = {}) => axiosInstance.post(url, data, config),

  put: (url, data = {}, config = {}) => axiosInstance.put(url, data, config),

  patch: (url, data = {}, config = {}) =>
    axiosInstance.patch(url, data, config),

  delete: (url, config = {}) => axiosInstance.delete(url, config),
};

export default apiService;
