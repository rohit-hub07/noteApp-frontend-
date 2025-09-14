import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const upgradeStore = create((set) => ({
  isUpgrading: false,

  upgrade: async (id) => {
    set({ isUpgrading: true });
    try {
      const res = await axiosInstance.post(`/tenants/${id}/upgrade`);
      toast.success(res.data.message);
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Failed to upgrade";
      toast.error(errMsg);
    } finally {
      set({ isUpgrading: false });
    }
  },
}));
