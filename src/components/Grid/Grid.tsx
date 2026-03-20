import { Cell } from "../Cell/Cell";
import "./Grid.css";

interface GridProps {
  data: { value: string | null }[][];
}

export const Grid = ({ data }: GridProps) => {
  return (
    <div className="grid-layout">
      {data.map((row, rowIndex) => (
        <div className="row-layout" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell key={rowIndex + "-" + colIndex} rowIndex={rowIndex} colIndex={colIndex} value={cell.value} />
          ))}
        </div>
      ))}
    </div>
  );
};
