import { create } from "zustand";

// 1. Define the shape of your data
interface CellData {
  value: string;
}

interface GridState {
  grid: CellData[][];
  selectedCell: { rowIndex: number; colIndex: number } | null;
  setSelectedCell: (rowIndex: number, colIndex: number) => void;
  isCellSelected: (rowIndex: number, colIndex: number) => boolean;
  updateCell: (rowIndex: number, colIndex: number) => void;
}

const initialGrid: CellData[][] = [
  [{ value: "1" }, { value: "1" }, { value: "1" }, { value: "1" }],
  [{ value: "1" }, { value: "1" }, { value: "1" }, { value: "1" }],
  [{ value: "1" }, { value: "1" }, { value: "1" }, { value: "1" }],
  [{ value: "1" }, { value: "1" }, { value: "1" }, { value: "1" }],
];

export const useGridStore = create<GridState>((set, get) => ({
  grid: initialGrid,
  selectedCell: null,

  setSelectedCell: (rowIndex, colIndex) =>
    set({
      selectedCell: { rowIndex, colIndex },
    }),

  isCellSelected: (rowIndex, colIndex) => {
    const state = get();
    return (
      rowIndex === state.selectedCell?.rowIndex &&
      colIndex === state.selectedCell?.colIndex
    );
  },

  updateCell: (rowIndex, colIndex) => {
    get().setSelectedCell(rowIndex, colIndex);

    set((state) => {
      // 2. Create a deep copy of the grid using map (Immutability)
      const newGrid = state.grid.map((row, rIdx) => {
        if (rIdx !== rowIndex) return row; // If not the row we want, keep it

        return row.map((cell, cIdx) => {
          if (cIdx !== colIndex) return cell; // If not the cell we want, keep it

          // 3. Logic: Increment the string value
          const currentNum = parseInt(cell.value);
          return { ...cell, value: (currentNum + 1).toString() };
        });
      });

      // 4. If you want an alert, do it here before returning the state
      // console.log(`Cell at [${rowIndex}, ${colIndex}] updated`);
      // console.log(state);

      return { grid: newGrid };
    });
  },
}));
