import "./Cell.css";

import React from "react";

import { GRID_SIZE, useGridStore } from "../../stores/GridStore";

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
  const unselectCell = useGridStore((state) => state.unselectCell);

  const isCellSeletected =
    selectedCell?.rowIndex === rowIndex && selectedCell?.colIndex === colIndex;

  const isInSelectedRow = selectedCell?.rowIndex === rowIndex;
  const isInSelectedCol = selectedCell?.colIndex === colIndex;

  const hasError = value !== 0 && value !== expectedValue;

  const classes = [
    "cell",
    isCellSeletected ? "cell-selected" : "",
    !isCellSeletected && (isInSelectedRow || isInSelectedCol)
      ? "cell-highlight"
      : "",
    hasError ? "cell-error-hidden" : "",
    value !== 0 && !isGiven ? "cell-filled" : "",
    isGiven ? "cell-given" : "cell-not-given",
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

  const handleClick = (rowIndex: number, colIndex: number) => {
    if (isGiven) {
      unselectCell();
    } else {
      setSelectedCell(rowIndex, colIndex);
    }
  };

  return (
    <div
      className={classes}
      style={borderStyle}
      role="button"
      onClick={() => handleClick(rowIndex, colIndex)}
    >
      <span className="cell-value">
        {displayValue === null ? value : displayValue}
      </span>
    </div>
  );
};
