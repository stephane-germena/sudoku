import { create } from "zustand";

interface AppState {
  // First loading of page
  isFirstGameLaunched?: boolean;
  launchFirstGame: () => void;
  // Timer
  elapsedSeconds: number;
  isTimeRunning: boolean;
  formatTime: (seconds: number) => string;
  tickTimer: () => void;
  resetTimer: () => void;
  setTimeRunning: (isRunnin: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // --- First loading of page ---
  isFirstGameLaunched: false,

  launchFirstGame: () => {
    set({
      isFirstGameLaunched: true,
    });
  },

  // --- Timer ---
  elapsedSeconds: 0,
  isTimeRunning: false,

  formatTime: (seconds): string => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  },

  tickTimer: () => {
    set((state) => {
      return state.isTimeRunning
        ? { elapsedSeconds: state.elapsedSeconds + 1 }
        : {};
    });
  },

  resetTimer: () => set({ elapsedSeconds: 0 }),

  setTimeRunning: (isRunning) => {
    set(() => {
      return { isTimeRunning: isRunning };
    });
  },
}));
