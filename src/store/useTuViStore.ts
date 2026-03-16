import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TuViData } from "../domain/model/types";

interface TuViStore {
  tuViData: TuViData | null;
  setTuViData: (data: TuViData) => void;
  clearTuViData: () => void;
}

export const useTuViStore = create<TuViStore>()(
  persist(
    (set) => ({
      tuViData: null,
      setTuViData: (data) => set({ tuViData: data }),
      clearTuViData: () => set({ tuViData: null }),
    }),
    { name: "tuvi-storage" }
  )
);
