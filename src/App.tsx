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

function App() {
  const [showDiffPicker, setShowDiffPicker] = useState(false);

  const displayMode = useGridStore((state) => state.displayMode);
  const grid = useGridStore((state) => state.grid);

  const isFirstGameLaunched = useAppStore((state) => state.isFirstGameLaunched);

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
    <div className="app">
      <header className="app-header">
        <Timer />
        <DisplayDifficulty />
        <NewGameButton
          showDiffPicker={showDiffPicker}
          onClick={() => setShowDiffPicker(true)}
          onClose={() => setShowDiffPicker(false)}
        />
        <DisplayMode />
      </header>

      {isFirstGameLaunched ? (
        renderMainGrid()
      ) : (
        <NewGameSettings onClose={() => setShowDiffPicker(false)} />
      )}
    </div>
  );
}

export default App;
