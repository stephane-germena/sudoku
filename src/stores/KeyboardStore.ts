import { create } from "zustand";

export const TILE_EMPTY = 0;

interface KeyboardState {
  selectedTile: number | null;
  setSelectedTile: (value: number | null) => void;
}

/*
 * Keyboard store
 */
export const useKeyboardStore = create<KeyboardState>((set) => ({
  selectedTile: null,

  setSelectedTile: (value) => {
    set({
      selectedTile: value,
    });
  },
}));
