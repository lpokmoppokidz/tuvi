import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NamTongLaSo } from "../domain/model/types";

interface TuViStore {
  tuViData: NamTongLaSo | null;
  setTuViData: (data: NamTongLaSo) => void;
  clearTuViData: () => void;
}

export const useTuViStore = create<TuViStore>()(
  persist(
    (set) => ({
      tuViData: null,
      setTuViData: (data) => set({ tuViData: data }),
      clearTuViData: () => set({ tuViData: null }),
    }),
    { name: "tuvi-namtong-storage" }
  )
);
