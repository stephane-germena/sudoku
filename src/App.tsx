import { Grid } from "./components/Grid/Grid";
import { Keyboard } from "./components/Keyboard/Keyboard";
import { useGridStore } from "./stores/GridStore";

function App() {
  const displayMode = "NUMBER";

  const grid = useGridStore((state) => state.grid);

  return (
    <>
      <Grid data={grid} displayMode={displayMode} />
      <Keyboard displayMode={displayMode} />
    </>
  );
}

export default App;
