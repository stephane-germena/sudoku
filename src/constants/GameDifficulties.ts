// export const EASY = "EASY";
// export const MEDIUM = "MEDIUM";
// export const HARD = "HARD";

// export type GAME_DIFFICULTIES_TYPES = EASY | MEDIUM | HARD;

export const GAME_DIFFICULTIES = {
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
} as const; // 'as const' makes the values read-only strings, not just 'string'

// 2. Create a Type based on that object (The type safety)
export type GAME_DIFFICULTY_TYPES = typeof GAME_DIFFICULTIES[keyof typeof GAME_DIFFICULTIES];

export const DIFFICULTY_SETTINGS: Record<GAME_DIFFICULTY_TYPES, { clues: number }> = {
  [GAME_DIFFICULTIES.EASY]: { clues: 45 },   // More clues = easier
  [GAME_DIFFICULTIES.MEDIUM]: { clues: 35 }, 
  [GAME_DIFFICULTIES.HARD]: { clues: 26 }    // Minimum for a standard Sudoku is usually ~17
};