import "./Cell.css";

import React from "react";

import { GRID_SIZE, useGridStore } from "../../stores/GridStore";
import { useKeyboardStore } from "../../stores/KeyboardStore";

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
  // Stores dependencies
  const selectedCell = useGridStore((state) => state.selectedCell);
  const setSelectedCell = useGridStore((state) => state.setSelectedCell);
  const unselectCell = useGridStore((state) => state.unselectCell);
  const updateSelectedCell = useGridStore((state) => state.updateSelectedCell);
  const activeKeyboardTile = useKeyboardStore((state) => state.selectedTile);

  const isCellSeletected =
    selectedCell?.rowIndex === rowIndex && selectedCell?.colIndex === colIndex;

  const isInSelectedRow = selectedCell?.rowIndex === rowIndex;
  const isInSelectedCol = selectedCell?.colIndex === colIndex;

  const hasError = value !== 0 && value !== expectedValue;

  // Set classes
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

  // Set styles
  let borderRightStyle = "1px solid var(--grid-cell-border)";
  if (colIndex === (GRID_SIZE - 1)) {
    borderRightStyle = "0";
  } else if (colIndex % 3 === 2) {
    borderRightStyle = "2px solid var(--grid-box-border)";
  }

  let borderBottomStyle = "1px solid var(--grid-cell-border)";
  if (rowIndex === (GRID_SIZE - 1)) {
    borderBottomStyle = "0";
  } else if (rowIndex % 3 === 2) {
    borderBottomStyle = "2px solid var(--grid-box-border)";
  }

  const borderStyle: React.CSSProperties = {
    borderRight: borderRightStyle,
    borderBottom: borderBottomStyle,
    borderTop: 0,
    borderLeft: 0
  };

  // Handle actions
  const handleClick = (rowIndex: number, colIndex: number) => {
    if (isGiven) {
      unselectCell();
    } else {
      setSelectedCell(rowIndex, colIndex);

      if (activeKeyboardTile !== null) {
        updateSelectedCell(activeKeyboardTile);
      }
    }
  };

  return (
    <button
      className={classes}
      style={borderStyle}
      onClick={() => handleClick(rowIndex, colIndex)}
    >
      <span className="cell-value">
        {displayValue === null ? value : displayValue}
      </span>
    </button>
  );
};
