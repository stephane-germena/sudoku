import "./KeyboardTile.css";

import { TILE_EMPTY, useKeyboardStore } from "../../stores/KeyboardStore";
import { useGridStore } from "../../stores/GridStore";

interface KeyboardTileProps {
  value: number;
  displayValue?: string;
  variant?: "default" | "erase";
  onPress?: () => void;
}

export const KeyboardTile = ({
  value,
  displayValue,
  variant = "default",
  onPress,
}: KeyboardTileProps) => {
  const currentSelectedTile = useKeyboardStore((state) => state.selectedTile);
  const setSelectedTile = useKeyboardStore((state) => state.setSelectedTile);

  const grid = useGridStore((state) => state.grid);
  const updateSelectedCell = useGridStore((state) => state.updateSelectedCell);
  const remainingSlots = useGridStore((state) => state.remainingSlots);

  const isSelectedTile = currentSelectedTile === value;
  const isEraseTile = value === TILE_EMPTY;

  const handleClick = () => {
    if (onPress) {
      onPress();
    } else {
      if (isSelectedTile || isEraseTile) {
        setSelectedTile(null);
      } else {
        setSelectedTile(value);
      }

      if (isEraseTile) {
        updateSelectedCell(TILE_EMPTY);
      }
    }
  };

  const label = displayValue ?? String(value);
  const remainingSlotsValue = remainingSlots(grid, value);

  return (
    <button
      className={`keyboard-tile keyboard-tile-${variant} ${isSelectedTile ? "keyboard-tile-selected" : "keyboard-tile-unselected"}`}
      onClick={handleClick}
      aria-label={variant === "erase" ? "Erase" : `Enter ${value}`}
      type="button"
    >
      <span className="keyboard-tile-label">{label}</span>
      {!isEraseTile && (
        <span
          className={`keyboard-tile-badge ${remainingSlotsValue === 0 ? "" : "keyboard-tile-badge-zero"} ${isSelectedTile ? "keyboard-tile-badge-selected" : ""}`}
        >
          {remainingSlotsValue}
        </span>
      )}
    </button>
  );
};
