import "./VictoryPanel.css";

import { type GAME_DIFFICULTY_TYPES } from "../../constants/GameDifficulties";

import { useAppStore } from "../../stores/AppStore";

interface VictoryPanelProps {
  elapsedSeconds: number;
  difficulty: GAME_DIFFICULTY_TYPES;
  onNewGame: (difficulty?: GAME_DIFFICULTY_TYPES) => void;
}

export const VictoryPanel = ({
  elapsedSeconds,
  difficulty,
  onNewGame,
}: VictoryPanelProps) => {
  const formatTime = useAppStore((state) => state.formatTime);

  return (
    <div className="victory-overlay">
      {/* Confetti dots */}
      <div className="victory-confetti" aria-hidden="true">
        {["🌸", "🌻", "🍀", "✨", "🌿", "💛", "🌱", "🎉", "🍄"].map(
          (dot, i) => (
            <span
              key={i}
              className="confetti-dot"
              style={{ "--i": i } as React.CSSProperties}
            >
              {dot}
            </span>
          ),
        )}
      </div>

      <div className="victory-card">
        <div className="victory-trophy">🎉</div>

        <h2 className="victory-title">Puzzle solved!</h2>
        <p className="victory-subtitle">You're on a roll {difficulty.emoji}</p>

        {/* Stats row */}
        <div className="victory-stats">
          <div className="victory-stat">
            <span className="victory-stat-label">Time</span>
            <span className="victory-stat-value">
              {formatTime(elapsedSeconds)}
            </span>
          </div>
          <div className="victory-stat">
            <span className="victory-stat-label">Difficulty</span>
            <span className="victory-stat-value">{difficulty.emoji}</span>
            <span className="victory-stat-note">{difficulty.label}</span>
          </div>
        </div>

        {/* New game */}
        <button
          className="victory-btn victory-btn-primary"
          onClick={() => onNewGame(difficulty)}
          type="button"
        >
          New ({difficulty.label}) sudoku ✦
        </button>
      </div>
    </div>
  );
};
