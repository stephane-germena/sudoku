import "./DisplayDifficulty.css";

import { type GAME_DIFFICULTY_TYPES } from "../../constants/GameDifficulties";

import { useGridStore } from "../../stores/GridStore";

export const DisplayDifficulty = () => {
  const gameDifficulty: GAME_DIFFICULTY_TYPES = useGridStore(
    (state) => state.gameDifficulty,
  );

  return (
    <span className="display-difficulty">
      {gameDifficulty.emoji} {gameDifficulty.label}
    </span>
  );
};
