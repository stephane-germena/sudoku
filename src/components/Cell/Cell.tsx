import "./Cell.css";

import React from "react";

import {
  EMPTY_CELL_VALUE,
  GRID_SIZE,
  useGridStore,
} from "../../stores/GridStore";
import { useKeyboardStore } from "../../stores/KeyboardStore";
import { getCellClasses, getCellStyles } from "../../stores/CellStore";

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
  // Grid store dependencies
  const grid = useGridStore((state) => state.grid);
  const selectedCell = useGridStore((state) => state.selectedCell);
  const setSelectedCell = useGridStore((state) => state.setSelectedCell);
  const unselectCell = useGridStore((state) => state.unselectCell);
  const updateSelectedCell = useGridStore((state) => state.updateSelectedCell);

  // Keyboard store dependencies
  const activeKeyboardTile = useKeyboardStore((state) => state.selectedTile);

  const isCellSeletected =
    selectedCell?.rowIndex === rowIndex && selectedCell?.colIndex === colIndex;
  const selectedCellValue = selectedCell
    ? grid[selectedCell.rowIndex][selectedCell.colIndex].value
    : null;
  const isSelectedCellEmpty = selectedCellValue === EMPTY_CELL_VALUE;

  const isInSelectedRow = selectedCell?.rowIndex === rowIndex;
  const isInSelectedCol = selectedCell?.colIndex === colIndex;
  const isSameValueAsSelected =
    value !== EMPTY_CELL_VALUE && selectedCellValue === value;

  const hasError = value !== EMPTY_CELL_VALUE && value !== expectedValue;

  // Set classes
  const classes = getCellClasses(
    value,
    isCellSeletected,
    isSelectedCellEmpty,
    isInSelectedRow,
    isInSelectedCol,
    isSameValueAsSelected,
    hasError,
    isGiven,
  );

  // Set styles
  const cellStyles = getCellStyles(rowIndex, colIndex, GRID_SIZE);
  const borderStyle: React.CSSProperties = {
    borderRight: cellStyles.borderRightStyle,
    borderBottom: cellStyles.borderBottomStyle,
    borderTop: cellStyles.borderTopStyle,
    borderLeft: cellStyles.borderLeftStyle,
  };

  // Handle actions
  const handleClick = (rowIndex: number, colIndex: number) => {
    const shouldUpdateValue = !isGiven && activeKeyboardTile !== null;

    if (
      rowIndex === selectedCell?.rowIndex &&
      colIndex === selectedCell?.colIndex &&
      !shouldUpdateValue
    ) {
      unselectCell();
    } else {
      setSelectedCell(rowIndex, colIndex);
    }

    if (shouldUpdateValue) {
      updateSelectedCell(activeKeyboardTile);
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
