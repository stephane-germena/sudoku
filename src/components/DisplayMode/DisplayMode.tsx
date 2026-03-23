import "./DisplayMode.css";

import { EMOJI } from "../../constants/DisplayModes";

import { useGridStore } from "../../stores/GridStore";

export const DisplayMode = () => {
  const displayMode = useGridStore((state) => state.displayMode);
  const toggleDisplayMode = useGridStore((state) => state.toggleDisplayMode);

  const handleClick = () => {
    toggleDisplayMode();
  };

  return (
    <div
      className={`display-mode-toggle ${displayMode === EMOJI ? "display-mode-toggle-emoji" : ""}`}
      onClick={handleClick}
      role="switch"
      aria-checked={displayMode === EMOJI}
      aria-label="Toggle display mode"
      tabIndex={0}
      onKeyDown={(e) => e.key === " " && toggleDisplayMode()}
    >
      <div className="display-mode-thumb" />
      <span className="display-mode-label display-mode-label-num">123</span>
      <span className="display-mode-label display-mode-label-emoji">🌸</span>
    </div>
  );
};
