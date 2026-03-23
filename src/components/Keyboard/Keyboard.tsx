import "./Keyboard.css";

import {
  NUMBER,
  DISPLAY_MAPS,
  type DISPLAY_MODES,
} from "../../constants/DisplayModes";
import { KeyboardTile } from "../KeyboardTile/KeyboardTile";
import { EMPTY_CELL_VALUE } from "../../stores/GridStore";

interface KeyboardProps {
  displayMode?: DISPLAY_MODES;
}

export const Keyboard = ({ displayMode }: KeyboardProps) => {
  const displayMap = DISPLAY_MAPS[displayMode ? displayMode : NUMBER];

  const tilesValue = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 0],
  ];

  return (
    <div className="keyboard">
      {tilesValue.map((row) => (
        <div className="keyboard-row">
          {row.map((tileValue) => (
            <KeyboardTile
              key={tileValue}
              value={tileValue}
              displayValue={
                tileValue === EMPTY_CELL_VALUE ? "⌫" : displayMap[tileValue]
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};
