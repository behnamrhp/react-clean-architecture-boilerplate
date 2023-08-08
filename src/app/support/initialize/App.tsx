import { GlobalStyles } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "../router/router";
import globalStyles from "./GlobalStyles";

function App() {
  /* ---------------------------------- Build --------------------------------- */
  return (
    <>
      <GlobalStyles styles={globalStyles} />
      <RouterProvider router={router} />
    </>
  );
  /* -------------------------------------------------------------------------- */
}

export default App;
