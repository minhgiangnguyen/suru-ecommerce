import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
