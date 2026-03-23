import "./Grid.css";

import { Cell, type CellProps } from "../Cell/Cell";
import {
  NUMBER,
  DISPLAY_MAPS,
  type DISPLAY_MODES,
} from "../../constants/DisplayModes";
// import { useGridStore } from "../../stores/GridStore";

interface GridProps {
  data: CellProps[][];
  displayMode?: DISPLAY_MODES;
}

export const Grid = ({ data, displayMode }: GridProps) => {
  const displayMap = DISPLAY_MAPS[displayMode ? displayMode : NUMBER];

  // const computeRowSum = useGridStore((state) => state.computeRowSum);
  // const computeColSum = useGridStore((state) => state.computeColSum);

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
          {/*computeRowSum(rowIndex)*/}
        </div>
      ))}
      
      {/*<div className="row-layout">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div className="cell">{computeColSum(i)}</div>
        ))}
      </div>
      */}
    </div>
  );
};
