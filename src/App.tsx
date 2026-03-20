import { Grid } from "./components/Grid/Grid";
import { useGridStore } from "./stores/GridStore";

function App() {
  const grid = useGridStore((state) => state.grid);

  return (
    <>
      <Grid data={grid} />
    </>
  );
}

export default App;
