import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteType {
  selectData: string[];
  click: number | null;
  setSelectData: (selectData: string[]) => void;
  setClick: (click: number | null) => void;
}

export const useFavorite = create<FavoriteType>()(
  persist(
    (set, get) => ({
      selectData: [],
      click: null,
      setSelectData: (input: string[]) => set({ selectData: input }),
      setClick: (input: number | null) => set({ click: input }),
    }),
    { name: "favorite-storage" }
  )
);
