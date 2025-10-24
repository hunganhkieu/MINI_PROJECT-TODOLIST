import axios from "axios";

const api = axios.create({
  baseURL: "https://api-class-o1lo.onrender.com/api/anhkh",
});

api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;
