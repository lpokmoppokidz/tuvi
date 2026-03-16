import { create } from "zustand";
import { CungDisplay } from "../domain/model/types";

interface UIStore {
  selectedCung: CungDisplay | null;
  showBirthForm: boolean;
  isDark: boolean;
  setSelectedCung: (cung: CungDisplay | null) => void;
  setShowBirthForm: (show: boolean) => void;
  toggleDark: () => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  selectedCung: null,
  showBirthForm: false,
  isDark: true,
  setSelectedCung: (cung) => set({ selectedCung: cung }),
  setShowBirthForm: (show) => set({ showBirthForm: show }),
  toggleDark: () => set((state) => ({ isDark: !state.isDark })),
}));
