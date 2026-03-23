import "./App.css";
import { DifficultyDisplay } from "./components/DifficultyDisplay/DifficultyDisplay";

import { Grid } from "./components/Grid/Grid";
import { Keyboard } from "./components/Keyboard/Keyboard";
import { NewGameButton } from "./components/NewGameButton/NewGameButton";
import { Timer } from "./components/Timer/Timer";
import { ToogleDisplayMode } from "./components/ToogleDisplayMode/ToogleDisplayMode";
import { useGridStore } from "./stores/GridStore";

function App() {
  const displayMode = "NUMBER";

  const grid = useGridStore((state) => state.grid);

  return (
    <div className="app">
      <header className="app-header">
        <Timer />
        <DifficultyDisplay />
        <NewGameButton />
        <ToogleDisplayMode />
      </header>
      <Grid data={grid} displayMode={displayMode} />
      <Keyboard displayMode={displayMode} />
    </div>
  );
}

export default App;
