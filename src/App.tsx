import { Grid } from "./components/Grid/Grid";
import { useGridStore } from "./stores/gridStore";

function App() {
  const grid = useGridStore((state) => state.grid);

  return (
    <>
      <Grid data={grid} />
    </>
  );
}

export default App;
