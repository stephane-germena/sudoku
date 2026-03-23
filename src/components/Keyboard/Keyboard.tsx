import "./Keyboard.css";

import {
  NUMBER,
  DISPLAY_MAPS,
  type DISPLAY_MODES,
} from "../../constants/DisplayModes";
import { KeyboardTile } from "../KeyboardTile/KeyboardTile";

interface KeyboardProps {
  displayMode?: DISPLAY_MODES;
}

export const Keyboard = ({ displayMode }: KeyboardProps) => {
  const displayMap = DISPLAY_MAPS[displayMode ? displayMode : NUMBER];

  const tilesValue = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  return (
    <div className="keyboard-layout">
      {tilesValue.map((row) => (
        <div className="keyboard-row-layout">
          {row.map((tileValue) => (
            <KeyboardTile
              value={tileValue}
              displayValue={displayMap[tileValue]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
