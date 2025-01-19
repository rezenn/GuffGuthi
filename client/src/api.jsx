import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // Update with your backend's base URL
});

// Attach the token to every request (if available)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
