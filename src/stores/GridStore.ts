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
  gridHistory: CellProps[][][];
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
  isGridFull: (grid: CellProps[][]) => boolean;
  isGridSolved: (grid: CellProps[][]) => boolean;
  remainingSlots: (grid: CellProps[][], value: number) => number;

  // Grid history
  storeGridState: (grid: CellProps[][]) => void;
  undoLastUpdate: () => void;
  isLastUpdateUndoable: () => boolean;
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
 * isValid operating on a flat number[] instead of CellProps[][].
 * Kept separate to avoid polluting the CellProps-based isValid above,
 * and because the solution counter only needs numbers, not full cell objects.
 */
const isValidFlat = (
  values: number[],
  row: number,
  col: number,
  num: number,
): boolean => {
  for (let i = 0; i < GRID_SIZE; i++) {
    if (values[row * GRID_SIZE + i] === num) return false; // row
    if (values[i * GRID_SIZE + col] === num) return false; // col
  }

  const rowStart = Math.floor(row / 3) * 3;
  const colStart = Math.floor(col / 3) * 3;

  for (let r = rowStart; r < rowStart + 3; r++) {
    for (let c = colStart; c < colStart + 3; c++) {
      if (values[r * GRID_SIZE + c] === num) return false; // 3x3 box
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
const diffBetweenGrids = (
  grid1: CellProps[][],
  grid2: CellProps[][],
): { rowIndex: number; colIndex: number } | null => {
  let firstDiffCell = null;

  for (let rowIndex = 0; rowIndex < GRID_SIZE; rowIndex++) {
    for (let colIndex = 0; colIndex < GRID_SIZE; colIndex++) {
      if (grid1[rowIndex][colIndex] !== grid2[rowIndex][colIndex]) {
        firstDiffCell = {
          rowIndex: rowIndex,
          colIndex: colIndex,
        };

        break;
      }
    }
  }

  return firstDiffCell;
};

/*
 *
 */
const generateRandomSudoku = () => {
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
 * Counts how many solutions a given puzzle has, up to a maximum of 2.
 * Stops as soon as a second solution is found, so it never does more
 * work than necessary.
 */
const countSolutions = (values: number[], limit = 2): number => {
  // Find the first empty cell (value === 0)
  const emptyIndex = values.indexOf(0);

  // No empty cells left — this is a complete solution
  if (emptyIndex === -1) return 1;

  const row = Math.floor(emptyIndex / GRID_SIZE);
  const col = emptyIndex % GRID_SIZE;
  let count = 0;

  for (let num = 1; num <= 9; num++) {
    if (isValidFlat(values, row, col, num)) {
      values[emptyIndex] = num;
      count += countSolutions(values, limit);
      values[emptyIndex] = 0; // backtrack

      // Short-circuit: no need to keep counting beyond the limit
      if (count >= limit) return count;
    }
  }

  return count;
};

/*
 * Removes cells from a solved grid one at a time, in random order,
 * only committing a removal when the puzzle still has exactly one solution.
 * Guarantees uniqueness for any difficulty level.
 */
const applyDifficulty = (
  solvedGrid: CellProps[][],
  difficulty: GAME_DIFFICULTY_TYPES,
): CellProps[][] => {
  const { clues } = difficulty;
  const cellsToRemove = GRID_SIZE * GRID_SIZE - clues;

  // Deep clone so we never mutate the original solved grid
  const grid: CellProps[][] = solvedGrid.map((row) =>
    row.map((cell) => ({ ...cell, isGiven: true })),
  );

  // Build a shuffled list of all 81 positions to try removing
  const positions = Array.from(
    { length: GRID_SIZE * GRID_SIZE },
    (_, i) => i,
  ).sort(() => Math.random() - 0.5);

  let removed = 0;

  for (const pos of positions) {
    if (removed >= cellsToRemove) break;

    const r = Math.floor(pos / GRID_SIZE);
    const c = pos % GRID_SIZE;

    // Skip cells already emptied
    if (grid[r][c].value === 0) continue;

    const backup = grid[r][c].value;

    // Tentatively remove the cell
    grid[r][c] = { ...grid[r][c], value: 0, isGiven: false };

    // Extract current values as a flat array for the solution counter
    const flat = grid.flatMap((row) => row.map((cell) => cell.value));

    // Only keep the removal if the puzzle still has exactly one solution
    if (countSolutions(flat) === 1) {
      removed++;
    } else {
      // Restore — this removal would create ambiguity
      grid[r][c] = { ...grid[r][c], value: backup, isGiven: true };
    }
  }

  return grid;
};

/*
 *
 */
const buildNewGrid = (difficulty: GAME_DIFFICULTY_TYPES): CellProps[][] => {
  const grid = generateRandomSudoku();
  return applyDifficulty(grid, difficulty);
};

const initialGrid = buildNewGrid(DEFAULT_GAME_DIFFICULTY);
const initialHistory = [initialGrid];

/*
 * Grid store
 */
export const useGridStore = create<GridState>((set, get) => ({
  grid: initialGrid,
  gridHistory: initialHistory,
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

    get().storeGridState(get().grid);
  },

  updateSelectedCell: (value) => {
    const selectedCell = get().getSelectedCell();

    if (!selectedCell) return null;

    get().updateCell(selectedCell.rowIndex, selectedCell.colIndex, value);
  },

  // ----- Game flow -----

  startNewGame: (gameDifficulty) => {
    const newGrid = buildNewGrid(
      gameDifficulty ? gameDifficulty : DEFAULT_GAME_DIFFICULTY,
    );
    set(() => {
      return {
        grid: newGrid,
        gridHistory: [newGrid],
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

  isGridFull: (grid) => {
    let isFull = true;

    grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.value == EMPTY_CELL_VALUE) {
          isFull = false;
        }
      });
    });

    return isFull;
  },

  isGridSolved: (grid) => {
    let isSolved = true;

    grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.expectedValue !== cell.value) {
          isSolved = false;
        }
      });
    });

    return isSolved;
  },

  remainingSlots: (grid, value) => {
    let remainingSlotsForValue = GRID_SIZE;

    grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.value === value) {
          remainingSlotsForValue = remainingSlotsForValue - 1;
        }
      });
    });

    return remainingSlotsForValue;
  },

  // ----- Game history -----

  storeGridState: (grid) => {
    set((state) => {
      return {
        gridHistory: [...state.gridHistory, grid],
      };
    });
  },

  undoLastUpdate: () => {
    if (get().isLastUpdateUndoable()) {
      set((state) => {
        const gridHistory = state.gridHistory;
        const gridToRestore = gridHistory[gridHistory.length - 2];
        const previousGrid = gridHistory[gridHistory.length - 1];

        if (previousGrid) {
          const diffCoordinates = diffBetweenGrids(gridToRestore, previousGrid);
          if (diffCoordinates)
            state.setSelectedCell(
              diffCoordinates.rowIndex,
              diffCoordinates.colIndex,
            );
        }

        return {
          grid: gridToRestore,
          gridHistory: gridHistory.slice(0, -1),
        };
      });
    }
  },

  isLastUpdateUndoable: () => {
    const gridHistory = get().gridHistory;

    return gridHistory.length > 1;
  },
}));
