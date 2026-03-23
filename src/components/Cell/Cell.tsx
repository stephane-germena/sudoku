import "./Cell.css";

import { GRID_SIZE, useGridStore } from "../../stores/GridStore";
import React from "react";

export interface CellProps {
  rowIndex: number;
  colIndex: number;
  value: number;
  expectedValue: number;
  displayValue?: string | null;
  isGiven?: boolean;
}

export const Cell = ({
  rowIndex,
  colIndex,
  value,
  expectedValue,
  displayValue,
  isGiven,
}: CellProps) => {
  const selectedCell = useGridStore((state) => state.selectedCell);
  const setSelectedCell = useGridStore((state) => state.setSelectedCell);

  const isCellSeletected =
    selectedCell?.rowIndex === rowIndex && selectedCell?.colIndex === colIndex;

  /*
  const isInSelectedRow = selectedCell?.rowIndex === rowIndex;
  const isInSelectedCol = selectedCell?.colIndex === colIndex;
  const isInSelectedBox =
    selectedCell &&
    Math.floor(selectedCell.rowIndex / 3) === Math.floor(rowIndex / 3) &&
    Math.floor(selectedCell.colIndex / 3) === Math.floor(colIndex / 3);
  */

  const hasError = value !== 0 && value !== expectedValue;

  const classes = [
    "cell",
    isCellSeletected ? "cell-selected" : "",
    hasError ? "cell-error" : "",
    value !== 0 && !isGiven ? "cell-filled" : "",
    isGiven ? "cell-given" : "",
  ]
    .filter(Boolean)
    .join(" ");

  let borderRightStyle = "1px solid var(--grid-cell-border)";
  if (colIndex === (GRID_SIZE - 1)) {
    borderRightStyle = "";
  } else if (colIndex % 3 === 2) {
    borderRightStyle = "2px solid var(--grid-box-border)";
  }

  let borderBottomStyle = "1px solid var(--grid-cell-border)";
  if (rowIndex === (GRID_SIZE - 1)) {
    borderBottomStyle = "";
  } else if (rowIndex % 3 === 2) {
    borderBottomStyle = "2px solid var(--grid-box-border)";
  }

  const borderStyle: React.CSSProperties = {
    borderRight: borderRightStyle,
    borderBottom: borderBottomStyle,
  };

  return (
    <div
      className={classes}
      style={borderStyle}
      onClick={() => setSelectedCell(rowIndex, colIndex)}
    >
      <span className="cell-value">
        {displayValue !== null ? displayValue : value}
      </span>
    </div>
  );
};
