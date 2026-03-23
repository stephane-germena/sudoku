import "./KeyboardTile.css";

import { useGridStore } from "../../stores/GridStore";

interface KeyboardTileProps {
  value: number;
  displayValue?: string;
}

export const KeyboardTile = ({ value, displayValue }: KeyboardTileProps) => {
  const updateSelectedCell = useGridStore((state) => state.updateSelectedCell);

  return (
    <div className={"keyboard-tile"} onClick={() => updateSelectedCell(value)}>
      {displayValue !== null ? displayValue : value}
    </div>
  );
};
