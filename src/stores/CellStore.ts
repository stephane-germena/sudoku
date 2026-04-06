/*
 * Return cell classes based on different conditions
 */
export const getCellClasses = (
  value: number,
  isCellSeletected: boolean,
  isSelectedCellEmpty: boolean,
  isInSelectedRow: boolean,
  isInSelectedCol: boolean,
  isSameValueAsSelected: boolean,
  hasError: boolean,
  isGiven: boolean | undefined,
) => {
  return [
    "cell",
    isCellSeletected ? "cell-selected" : "",
    !isCellSeletected &&
    ((isSelectedCellEmpty && (isInSelectedRow || isInSelectedCol)) ||
      (!isSelectedCellEmpty && isSameValueAsSelected))
      ? "cell-highlight"
      : "",
    hasError ? "cell-error-hidden" : "",
    value !== 0 && !isGiven ? "cell-filled" : "",
    isGiven ? "cell-given" : "cell-not-given",
  ]
    .filter(Boolean)
    .join(" ");
};

/*
 * Return default cell styles (borders) based on its position in the grid
 */
export const getCellStyles = (
  rowIndex: number,
  colIndex: number,
  gridSize: number,
) => {
  let borderRightStyle = "1px solid var(--grid-cell-border)";
  if (colIndex === gridSize - 1) {
    borderRightStyle = "0";
  } else if (colIndex % 3 === 2) {
    borderRightStyle = "2px solid var(--grid-box-border)";
  }

  let borderBottomStyle = "1px solid var(--grid-cell-border)";
  if (rowIndex === gridSize - 1) {
    borderBottomStyle = "0";
  } else if (rowIndex % 3 === 2) {
    borderBottomStyle = "2px solid var(--grid-box-border)";
  }

  return {
    borderRightStyle: borderRightStyle,
    borderBottomStyle: borderBottomStyle,
    borderTopStyle: "0",
    borderLeftStyle: "0",
  };
};
