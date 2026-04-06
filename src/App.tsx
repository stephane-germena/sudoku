import "./App.css";
import { DisplayDifficulty } from "./components/DisplayDifficulty/DisplayDifficulty";

import { useState } from "react";

import { Grid } from "./components/Grid/Grid";
import { Keyboard } from "./components/Keyboard/Keyboard";
import { NewGameButton } from "./components/NewGameButton/NewGameButton";
import { Timer } from "./components/Timer/Timer";
import { DisplayMode } from "./components/DisplayMode/DisplayMode";
import { NewGameSettings } from "./components/NewGameSettings/NewGameSettings";

import { useGridStore } from "./stores/GridStore";
import { useAppStore } from "./stores/AppStore";
import { Button } from "./components/Button/Button";

function App() {
  const [showNewGameSettings, setShowNewGameSettings] = useState(false);
  const [isUndoDisabled, setIsUndoDisabled] = useState(true);

  const isFirstGameLaunched = useAppStore((state) => state.isFirstGameLaunched);
  const setTimeRunning = useAppStore((state) => state.setTimeRunning);

  const displayMode = useGridStore((state) => state.displayMode);
  const grid = useGridStore((state) => state.grid);

  // Undo management
  const undoLastUpdate = useGridStore((state) => state.undoLastUpdate);
  const isLastUpdateUndoable = useGridStore((state) => state.isLastUpdateUndoable);
  if (isLastUpdateUndoable() && isUndoDisabled) {
    setIsUndoDisabled(false);
  } else if (!isLastUpdateUndoable() && !isUndoDisabled) {
    setIsUndoDisabled(true);
  }

  const tooltipInProgress = "Coming soon!";
  const tooltipActionBlocked = "Action not possible!";

  const handledNewGameButton = () => {
    setShowNewGameSettings(true);
    setTimeRunning(false);
  };

  const handleCloseNewGameSettings = () => {
    setShowNewGameSettings(false);
    setTimeRunning(true);
  };

  const renderMainGrid = () => (
    <>
      <main className="app-grid-area">
        <Grid data={grid} displayMode={displayMode} />
      </main>

      <div className="app-keyboard-area">
        <Keyboard displayMode={displayMode} />
      </div>
    </>
  );

  return (
    <div className="app-container">
      <div className="app">
        <header className="app-header">
          <Timer />
          <DisplayDifficulty />
          <DisplayMode />
          <NewGameButton
            showDiffPicker={showNewGameSettings}
            onClick={handledNewGameButton}
            onClose={handleCloseNewGameSettings}
          />
        </header>

        {isFirstGameLaunched ? (
          renderMainGrid()
        ) : (
          <NewGameSettings onClose={handleCloseNewGameSettings} />
        )}
      </div>

      <div className="app-actions">
        <Button
          label="Undo"
          icon="↩"
          type="secondary"
          disabled={isUndoDisabled}
          tooltipMessage={isUndoDisabled ? tooltipActionBlocked : ""}
          onClick={undoLastUpdate}
        />
        <Button
          label="Hints"
          icon="💡"
          type="secondary"
          backgroundColor="#FFF9E6"
          backgroundColorHover="#FFF3CC"
          textColor="#8A6400"
          borderColor="#F0C040"
          tooltipMessage={tooltipInProgress}
        />
        <Button
          label="Notes"
          icon="✏️"
          type="secondary"
          tooltipMessage={tooltipInProgress}
        />
      </div>
    </div>
  );
}

export default App;
