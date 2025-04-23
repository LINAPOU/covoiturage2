import { create } from "zustand";
import AxiosApi from "./AxiosApi.js";

export const NotificationStore = create((set) => ({
  number: 0,
  fetch: async () => {
    const res = await AxiosApi("/users/notification");
    set({ number: res.data });
  },
  decrease: () => {
    set((prev) => ({ number: prev.number - 1 }));
  },
  reset: () => {
    set({ number: 0 });
  },
}));