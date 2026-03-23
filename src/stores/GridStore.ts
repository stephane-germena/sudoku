import { create } from "zustand";

import { EMOJI, NUMBER, type DISPLAY_MODES } from "../constants/DisplayModes";
import {
  DIFFICULTY_SETTINGS,
  type GAME_DIFFICULTY_TYPES,
} from "../constants/GameDifficulties";

import type { CellProps } from "../components/Cell/Cell";

export const GRID_SIZE = 9;
export const EMPTY_CELL_VALUE = 0;
export const DEFAULT_GAME_DIFFICULTY = DIFFICULTY_SETTINGS.HARD;

interface GridState {
  // Core grid
  grid: CellProps[][];
  selectedCell: { rowIndex: number; colIndex: number } | null;

  // Game settings
  displayMode: DISPLAY_MODES;
  gameDifficulty: GAME_DIFFICULTY_TYPES;

  // Selectors
  getSelectedCell: () => CellProps | null;

  // Cell actions
  setSelectedCell: (rowIndex: number, colIndex: number) => void;
  unselectCell: () => void;
  updateCell: (rowIndex: number, colIndex: number, value: number) => void;
  updateSelectedCell: (value: number) => void;

  // Game flow
  startNewGame: (gameDifficulty?: GAME_DIFFICULTY_TYPES) => void;
  setGameDifficulty: (gameDifficulty: GAME_DIFFICULTY_TYPES) => void;
  toggleDisplayMode: (displayMode?: DISPLAY_MODES) => void;
}

/*
 * Check if a value could fit in a given cell
 */
const isValid = (
  grid: CellProps[][],
  row: number,
  col: number,
  num: number,
) => {
  const valueToCompare = num;

  for (let i = 0; i < GRID_SIZE; i++) {
    // 1. Check Row (Horizontal)
    if (i !== col && grid[row][i].expectedValue === valueToCompare)
      return false;

    // 2. Check Column (Vertical)
    if (i !== row && grid[i][col].expectedValue === valueToCompare)
      return false;
  }

  // 3. Check 3x3 Square
  const rowStart = Math.floor(row / 3) * 3;
  const colStart = Math.floor(col / 3) * 3;

  for (let r = rowStart; r < rowStart + 3; r++) {
    for (let c = colStart; c < colStart + 3; c++) {
      if (
        (r !== row || c !== col) &&
        grid[r][c].expectedValue === valueToCompare
      ) {
        return false;
      }
    }
  }

  return true;
};

/*
 *
 */
/*
const possibleValues = (
  grid: CellProps[][],
  rowIndex: number,
  colIndex: number,
) => {
  let possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Check row
  for (let i = 0; i < GRID_SIZE; i++) {
    // Check row, column, and 3x3 subgrid simultaneously
    const rowStart = 3 * Math.floor(row / 3);
    const colStart = 3 * Math.floor(col / 3);

    if (possibleValues.includes(grid[row][i].expectedValue)) possibleValues = possibleValues.filter(item => item !== grid[row][i].expectedValuevalue);
    if (grid[i][col].value === num) return false;
    if (grid[rowStart + Math.floor(i / 3)][colStart + (i % 3)].value === num)
      return false;
  }

  return possibleValues;
};
*/

/*
 *
 */
export const generateRandomSudoku = () => {
  const grid: CellProps[][] = Array.from({ length: GRID_SIZE }, (_, i) =>
    Array.from({ length: GRID_SIZE }, (_, j) => ({
      rowIndex: i,
      colIndex: j,
      expectedValue: EMPTY_CELL_VALUE,
      value: EMPTY_CELL_VALUE,
      isGiven: true,
    })),
  );

  const initialValuesToTest = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(
    () => Math.random() - 0.5,
  );

  const stack: {
    cell: CellProps;
    key: string;
    remainingValuesToTest: number[];
  }[] = [];
  let rowIndex = 0;
  let colIndex = 0;

  while (rowIndex < GRID_SIZE) {
    const key = `${rowIndex}-${colIndex}`;

    if (!stack.some((e) => e.key === rowIndex + "-" + colIndex)) {
      stack.push({
        cell: grid[rowIndex][colIndex],
        key: key,
        remainingValuesToTest: initialValuesToTest,
      });
    }

    let found = false;
    const current = stack[stack.length - 1];

    // Try the numbers in the current stack frame
    while (current.remainingValuesToTest.length > 0) {
      const testedValue = current.remainingValuesToTest[0];

      current.remainingValuesToTest = current.remainingValuesToTest.filter(
        (num) => num !== testedValue,
      );

      const isTestValid = isValid(grid, rowIndex, colIndex, testedValue);

      if (isTestValid) {
        grid[rowIndex][colIndex] = {
          ...grid[rowIndex][colIndex],
          expectedValue: testedValue,
          value: testedValue,
        };
        found = true;
        break;
      }
    }

    if (found) {
      // Move to next cell
      colIndex = colIndex + 1;
      if (colIndex === GRID_SIZE) {
        rowIndex = rowIndex + 1;
        colIndex = 0;
      }
    } else {
      // BACKTRACK: Go back to previous stack frame
      grid[rowIndex][colIndex] = {
        ...grid[rowIndex][colIndex],
        expectedValue: EMPTY_CELL_VALUE,
        value: EMPTY_CELL_VALUE,
      };
      stack.pop();
      if (stack.length === 0) return grid; // Unsolvable (shouldn't happen)
      const prev = stack[stack.length - 1];

      rowIndex = prev.cell.rowIndex;
      colIndex = prev.cell.colIndex;

      prev.cell = {
        ...prev.cell,
        expectedValue: EMPTY_CELL_VALUE,
        value: EMPTY_CELL_VALUE,
      };
    }
  }

  return grid;
};

/*
 *
 */
const applyDifficulty = (
  grid: CellProps[][],
  difficulty: GAME_DIFFICULTY_TYPES,
) => {
  const { clues } = difficulty;
  const cellsToRemove = GRID_SIZE * GRID_SIZE - clues;
  let removed = 0;

  // Clone the grid to avoid mutating the original solution
  while (removed < cellsToRemove) {
    const rowIndex = Math.floor(Math.random() * GRID_SIZE);
    const colIndex = Math.floor(Math.random() * GRID_SIZE);

    if (grid[rowIndex][colIndex].value !== EMPTY_CELL_VALUE) {
      grid[rowIndex][colIndex] = {
        ...grid[rowIndex][colIndex],
        value: EMPTY_CELL_VALUE,
        isGiven: false,
      };
      removed++;
    }
  }
  return grid;
};

const buildNewGrid = (difficulty: GAME_DIFFICULTY_TYPES): CellProps[][] => {
  const grid = generateRandomSudoku();
  return applyDifficulty(grid, difficulty);
};

/*
 * Grid store
 */
export const useGridStore = create<GridState>((set, get) => ({
  grid: buildNewGrid(DEFAULT_GAME_DIFFICULTY),
  selectedCell: null,
  displayMode: NUMBER,
  gameDifficulty: DEFAULT_GAME_DIFFICULTY,

  // ----- Selectors -----

  getSelectedCell: () => {
    const { grid, selectedCell } = get();

    if (!selectedCell) return null;

    return grid[selectedCell.rowIndex][selectedCell.colIndex];
  },

  // ----- Cell actions -----

  setSelectedCell: (rowIndex, colIndex) => {
    set({
      selectedCell: { rowIndex, colIndex },
    });
  },

  unselectCell: () => {
    set({
      selectedCell: null,
    });
  },

  updateCell: (rowIndex, colIndex, value) => {
    set((state) => {
      // Create a deep copy of the grid using map (Immutability)
      const newGrid = state.grid.map((row, rIdx) => {
        if (rIdx !== rowIndex) return row; // If not the row we want, keep it

        return row.map((cell, cIdx) => {
          if (cIdx !== colIndex) return cell; // If not the cell we want, keep it

          return { ...cell, value: value };
        });
      });

      return { grid: newGrid };
    });
  },

  updateSelectedCell: (value) => {
    const selectedCell = get().getSelectedCell();

    if (!selectedCell) return null;

    get().updateCell(selectedCell.rowIndex, selectedCell.colIndex, value);
  },

  // ----- Game flow -----

  startNewGame: (gameDifficulty) => {
    set(() => {
      return {
        grid: buildNewGrid(
          gameDifficulty ? gameDifficulty : DEFAULT_GAME_DIFFICULTY,
        ),
      };
    });
  },

  setGameDifficulty: (gameDifficulty) => {
    set({
      gameDifficulty: gameDifficulty,
    });
  },

  toggleDisplayMode: (displayMode) => {
    set((state) => ({
      displayMode: displayMode
        ? displayMode
        : state.displayMode === NUMBER
          ? EMOJI
          : NUMBER,
    }));
  },
}));
