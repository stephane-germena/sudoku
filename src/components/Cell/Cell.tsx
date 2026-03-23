import "./Cell.css";

import { useGridStore } from "../../stores/GridStore";

export interface CellProps {
  rowIndex: number;
  colIndex: number;
  value: number;
  expectedValue: number;
  displayValue?: string | null;
}

export const Cell = ({
  rowIndex,
  colIndex,
  value,
  expectedValue,
  displayValue,
}: CellProps) => {
  const selectedCell = useGridStore((state) => state.selectedCell);

  const isCellSeletected =
    selectedCell?.rowIndex === rowIndex && selectedCell?.colIndex === colIndex;
  const setSelectedCell = useGridStore((state) => state.setSelectedCell);

  const selectedClassName = isCellSeletected ? "cell-selected" : "";
  const errorClassName = (value !== 0 && expectedValue !== value) ? "cell-error" : "";

  const borderStyle = {
    // Add thick border to the right of cols 2, 5, and 8 (0-indexed)
    borderRight: colIndex % 3 === 2 ? "3px solid black" : "1px solid #ccc",
    // Add thick border to the bottom of rows 2, 5, and 8
    borderBottom: rowIndex % 3 === 2 ? "3px solid black" : "1px solid #ccc",
    // Special case for the very last borders to keep it clean
    borderLeft: colIndex === 0 ? "3px solid black" : "",
    borderTop: rowIndex === 0 ? "3px solid black" : "",
  };

  return (
    <div
      className={`cell ${selectedClassName} ${errorClassName}`}
      style={borderStyle}
      onClick={() => setSelectedCell(rowIndex, colIndex)}
    >
      {displayValue !== null ? displayValue : value}
    </div>
  );
};
