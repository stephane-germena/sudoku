import "./NewGameButton.css";

import { NewGameSettings } from "../NewGameSettings/NewGameSettings";

import { useGridStore } from "../../stores/GridStore";

interface NewGameButtonProps {
  showDiffPicker: boolean,
  onClick?: () => void;
  onClose: () => void;
}

export const NewGameButton = ({ showDiffPicker, onClick, onClose }: NewGameButtonProps) => {
  const startNewGame = useGridStore((state) => state.startNewGame);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      startNewGame();
    }
  };

  return (
    <>
      <button className="new-game-button" onClick={handleClick}>
        + New game
      </button>

      {/* -- New game settings -- */}
      {showDiffPicker && (
        <NewGameSettings
          onClose={onClose}
        />
      )}
    </>
  );
};
