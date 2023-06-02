import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoginType {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export const useLogin = create<LoginType>()(
  persist(
    (set, get) => ({
      isLogin: false,
      setIsLogin: (input: boolean) => set({ isLogin: input }),
    }),
    { name: "login-storage" }
  )
);
