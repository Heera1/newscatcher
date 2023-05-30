import create from "zustand";
import { persist } from "zustand/middleware";

interface LoginType {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export const useLogin = create<LoginType>((set) => ({
  isLogin: false,
  setIsLogin: (input: boolean) => set({ isLogin: input }),
}));
