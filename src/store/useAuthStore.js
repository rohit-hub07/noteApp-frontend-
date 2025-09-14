import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLogginIn: false,
  isCheckingUser: false,

  checkAuth: async () => {
    set({ isCheckingUser: true });
    try {
      const res = await axiosInstance.get("/user/profile");
      set({ authUser: res.data.user });
    } catch (error) {
      // Clear auth user if authentication fails
      set({ authUser: null });
      console.log("Authentication check failed:", error.message);
    } finally {
      set({ isCheckingUser: false });
    }
  },

  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/user/register", data);
      set({ authUser: res.data.newUser });
      toast.success(res.data.message);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMsg);
    } finally {
      set({ isSigninUp: false });
    }
  },
  login: async (data) => {
    set({ isLogginIn: true });
    try {
      const res = await axiosInstance.post("/user/login", data);
      set({ authUser: res.data.user });
      toast.success(res.data.message);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(errorMsg);
    } finally {
      set({ isLogginIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.get("/user/logout");
      set({ authUser: null });
      toast.success("Logout successfully");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(errorMsg);
    }
  },
}));
