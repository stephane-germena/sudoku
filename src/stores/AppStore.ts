import { create } from "zustand";

interface AppState {
  isFirstGameLaunched?: boolean;
  launchFirstGame: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isFirstGameLaunched: false,

  launchFirstGame: () => {
    set({
      isFirstGameLaunched: true,
    });
  },
}));
