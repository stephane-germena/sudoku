import "./NewGameSettings.css";

import { useState } from "react";

import {
  DIFFICULTY_SETTINGS,
  type GAME_DIFFICULTY_TYPES,
} from "../../constants/GameDifficulties";

import { useAppStore } from "../../stores/AppStore";
import { DEFAULT_GAME_DIFFICULTY, useGridStore } from "../../stores/GridStore";

interface NewGameSettingsProps {
  onClose: () => void;
}

export const NewGameSettings = ({
  onClose,
}: NewGameSettingsProps) => {
  const difficulties = Object.values(
    DIFFICULTY_SETTINGS,
  ) as GAME_DIFFICULTY_TYPES[];

  const launchFirstGame = useAppStore((state) => state.launchFirstGame);
  const setGameDifficulty = useGridStore((state) => state.setGameDifficulty);
  const startNewGame = useGridStore((state) => state.startNewGame);
  
  const handleStartNewGame = (difficulty: GAME_DIFFICULTY_TYPES) => {
    launchFirstGame();
    setGameDifficulty(difficulty);
    startNewGame(difficulty);
    onClose();
  };

  const [selectedDifficulty, setSelected] = useState<GAME_DIFFICULTY_TYPES>(
    DEFAULT_GAME_DIFFICULTY,
  );

  const selectDifficulty = (difficulty: GAME_DIFFICULTY_TYPES) => {
    setSelected(difficulty); // ✅ triggers a re-render
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="new-game-settings-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        className="new-game-settings-layout"
        role="dialog"
        aria-label="Choose difficulty"
      >
        <div className="new-game-settings-handle" />

        <h2 className="new-game-settings-title">Choose difficulty</h2>
        <p className="new-game-settings-subtitle">A new puzzle will be generated</p>

        <div className="new-game-settings-cards">
          {difficulties.map((diff) => {
            const isActive = diff === selectedDifficulty;
            return (
              <button
                key={diff.label}
                className={`new-game-settings-card ${isActive ? "new-game-settings-card-active" : ""}`}
                onClick={() => selectDifficulty(diff)}
                type="button"
              >
                {isActive && <span className="new-game-settings-card-check">✓</span>}
                <span className="new-game-settings-card-emoji">{diff.emoji}</span>
                <span className="new-game-settings-card-label">{diff.label}</span>
              </button>
            );
          })}
        </div>

        <button
          className="new-game-settings-start"
          onClick={() => handleStartNewGame(selectedDifficulty)}
          type="button"
        >
          Start {selectedDifficulty.label} puzzle ✦
        </button>
      </div>
    </>
  );
};
