import "./Grid.css";

import {
  NUMBER,
  DISPLAY_MAPS,
  type DISPLAY_MODES,
} from "../../constants/DisplayModes";

import { Cell, type CellProps } from "../Cell/Cell";

interface GridProps {
  data: CellProps[][];
  displayMode?: DISPLAY_MODES;
}

export const Grid = ({ data, displayMode }: GridProps) => {
  const displayMap = DISPLAY_MAPS[displayMode ? displayMode : NUMBER];

  return (
    <div className="grid-layout">
      {data.map((row, rowIndex) => (
        <div className="row-layout" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell
              {...cell}
              rowIndex={rowIndex}
              colIndex={colIndex}
              displayValue={displayMap[cell.value]}
              key={rowIndex + "-" + colIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
