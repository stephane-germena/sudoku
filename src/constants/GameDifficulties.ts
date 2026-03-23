export const DIFFICULTY_SETTINGS = {
  "EASY": { emoji: "🌱", label: "Easy", clues: 45 },
  "MEDIUM": { emoji: "🌿", label: "Medium", clues: 35 },
  "HARD": { emoji: "🌳", label: "Hard", clues: 26 },
} as const; // 'as const' makes the values read-only strings, not just 'string'

// 2. Create a Type based on that object (The type safety)
export type GAME_DIFFICULTY_TYPES =
  (typeof DIFFICULTY_SETTINGS)[keyof typeof DIFFICULTY_SETTINGS];
