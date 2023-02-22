import Grid from "@mui/material/Grid";

import router from "./routes/route";
import { RouterProvider } from "react-router";

function App() {
  return (
    <Grid container minHeight="100vh">
      <RouterProvider router={router} />
    </Grid>
  );
}

export default App;
