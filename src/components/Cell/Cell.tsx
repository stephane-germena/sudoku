import './Cell.css'

import { useGridStore } from '../../stores/gridStore'

interface CellProps {
  key: string,
  rowIndex: number,
  colIndex: number,
  value: string | number | null; // The emoji (e.g., '🐶') or null if empty
  isFixed?: boolean | null;    // True if it's a starting hint (so she can't change it)
  error?: boolean | null;     // True if the emoji breaks a Sudoku rule
}

export const Cell = ({ value, rowIndex, colIndex }: CellProps) => {
  const setSelectedCell = useGridStore((state) => state.setSelectedCell);

  return (
    <div className="cell" onClick={() => setSelectedCell(rowIndex, colIndex)}>
      {value}
    </div>
  );
};