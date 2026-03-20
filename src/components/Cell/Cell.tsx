import './Cell.css'

import { useGridStore } from '../../stores/GridStore'

interface CellProps {
  key: string,
  rowIndex: number,
  colIndex: number,
  value: string | number | null; // The emoji (e.g., '🐶') or null if empty
  isFixed?: boolean | null;    // True if it's a starting hint (so she can't change it)
  error?: boolean | null;     // True if the emoji breaks a Sudoku rule
}

export const Cell = ({ value, rowIndex, colIndex }: CellProps) => {
  const isCellSeletected = useGridStore((state) => state.isCellSelected);
  const updateCell = useGridStore((state) => state.updateCell);

  const selectedClassName = isCellSeletected(rowIndex, colIndex) ? "cell-selected" : "";

  return (
    <div className={`cell ${selectedClassName}`} onClick={() => updateCell(rowIndex, colIndex)}>
      {value}
    </div>
  );
};