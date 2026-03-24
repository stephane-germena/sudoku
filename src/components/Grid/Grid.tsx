import "./Grid.css";

import {
  NUMBER,
  DISPLAY_MAPS,
  type DISPLAY_MODES,
} from "../../constants/DisplayModes";

import { Cell, type CellProps } from "../Cell/Cell";
import { useGridStore } from "../../stores/GridStore";
import type { GAME_DIFFICULTY_TYPES } from "../../constants/GameDifficulties";
import { useAppStore } from "../../stores/AppStore";
import { VictoryPanel } from "../VictoryPanel/VictoryPanel";
import { ErrorPanel } from "../ErrorPanel/ErrorPanel";

interface GridProps {
  data: CellProps[][];
  displayMode?: DISPLAY_MODES;
}

export const Grid = ({ data, displayMode }: GridProps) => {
  const displayMap = DISPLAY_MAPS[displayMode ? displayMode : NUMBER];

  const elapsedSeconds = useAppStore((state) => state.elapsedSeconds);
  const resetTimer = useAppStore((state) => state.resetTimer);
  const setTimeRunning = useAppStore((state) => state.setTimeRunning);

  const grid = useGridStore((state) => state.grid);
  const difficulty = useGridStore((state) => state.gameDifficulty);
  const isGridFull = useGridStore((state) => state.isGridFull);
  const isGridSolved = useGridStore((state) => state.isGridSolved);
  const setGameDifficulty = useGridStore((state) => state.setGameDifficulty);
  const startNewGame = useGridStore((state) => state.startNewGame);
  const unselectCell = useGridStore((state) => state.unselectCell);

  const displayErrorPanel = (grid: CellProps[][]) => {
    if (isGridFull(grid) && !isGridSolved(grid)) {
      return <ErrorPanel key={animationKey} />;
    }
  };

  const displayVictoryPanel = (grid: CellProps[][]) => {
    if (isGridSolved(grid)) {
      unselectCell();
      setTimeRunning(false);
      return (
        <VictoryPanel
          elapsedSeconds={elapsedSeconds}
          difficulty={difficulty}
          onNewGame={() => startStartNewGameAfterSolve(difficulty)}
        />
      );
    }
  };

  const startStartNewGameAfterSolve = (difficulty: GAME_DIFFICULTY_TYPES) => {
    setGameDifficulty(difficulty);
    startNewGame(difficulty);
    resetTimer();
    setTimeRunning(true);
  };

  const animationKey = grid
    .flatMap((row) => row.map((cell) => cell.value))
    .join("-");

  return (
    <div className="grid-container">
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

      {displayErrorPanel(grid)}
      {displayVictoryPanel(grid)}
    </div>
  );
};
