import { GlobalStyles } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import globalStyles from "~/bootstrap/helper/view/GlobalStyles";
import router from "../router/router";

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
