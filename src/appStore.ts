import { create } from "zustand";
import { Klass } from "./types";

interface AppState {
  classes: Klass[];
  setClasses: (classes: Klass[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  classes: [],
  setClasses: (classes) =>
    set({
      classes,
    }),
}));
