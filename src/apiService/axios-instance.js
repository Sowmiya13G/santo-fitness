import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach auth token from localStorage to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ------------- API METHODS WITH SUPPORT FOR DYNAMIC QUERIES, HEADERS, BODY, ETC. -------------

const apiService = {
  get: (url, params = {}, config = {}) =>
    axiosInstance.get(url, { params, ...config }),

  post: (url, data = {}, config = {}) =>
    axiosInstance.post(url, data, config),

  put: (url, data = {}, config = {}) =>
    axiosInstance.put(url, data, config),

  patch: (url, data = {}, config = {}) =>
    axiosInstance.patch(url, data, config),

  delete: (url, config = {}) =>
    axiosInstance.delete(url, config),
};

export default apiService;
