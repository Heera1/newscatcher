import create from "zustand";

interface LoginType {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export const useLogin = create<LoginType>((set) => ({
  isLogin: false,
  setIsLogin: (input: boolean) => set({ isLogin: input }),
}));
