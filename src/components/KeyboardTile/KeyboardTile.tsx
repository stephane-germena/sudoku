import "./KeyboardTile.css";

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
  const updateSelectedCell = useGridStore((state) => state.updateSelectedCell);

  const handleClick = () => {
    if (onPress) {
      onPress();
    } else {
      updateSelectedCell(value);
    }
  };

  const label = displayValue !== undefined && displayValue !== null
    ? displayValue
    : String(value);

  return (
    <button
      className={`keyboard-tile keyboard-tile-${variant}`}
      onClick={handleClick}
      aria-label={variant === "erase" ? "Erase" : `Enter ${value}`}
      type="button"
    >
      <span className="keyboard-tile-label">{label}</span>
    </button>
  );
};
