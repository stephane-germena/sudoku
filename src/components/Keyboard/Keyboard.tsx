import "./Keyboard.css";

import {
  NUMBER,
  DISPLAY_MAPS,
  type DISPLAY_MODES,
} from "../../constants/DisplayModes";

import { KeyboardTile } from "../KeyboardTile/KeyboardTile";

import { EMPTY_CELL_VALUE } from "../../stores/GridStore";
import { TILE_EMPTY } from "../../stores/KeyboardStore";

interface KeyboardProps {
  displayMode?: DISPLAY_MODES;
}

export const Keyboard = ({ displayMode }: KeyboardProps) => {
  const displayMap = DISPLAY_MAPS[displayMode ? displayMode : NUMBER];

  const tilesValue = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, TILE_EMPTY],
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
              variant={tileValue === EMPTY_CELL_VALUE ? "erase" : undefined}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
