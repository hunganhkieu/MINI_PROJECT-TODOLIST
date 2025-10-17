import axios from "axios";

const api = axios.create({
  baseURL: "https://api-class-o1lo.onrender.com/api/anhkh/todos",
});

export default api;
