import { create } from "zustand";

interface AppState {
  appViewUrl: string;
  setAppViewUrl: (appViewUrl: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  appViewUrl: "",
  setAppViewUrl: (appViewUrl) =>
    set({
      appViewUrl,
    }),
}));
