import { create } from "zustand";

interface State {
  email: string;
  phone: string;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
}

export const useUserStore = create<State>((set) => ({
  email: "",
  phone: "",
  setEmail: (email) => set({ email }),
  setPhone: (phone) => set({ phone }),
}));
