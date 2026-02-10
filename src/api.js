import axios from "axios";
import API_URL from "./config";

const api = axios.create({
  baseURL: API_URL
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      sessionStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);
export default api;
