import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8000"
      : "https://backend-leza905b8-rohit-hub07s-projects.vercel.app",
  withCredentials: true,
});


