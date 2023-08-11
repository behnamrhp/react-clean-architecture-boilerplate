import { GlobalStyles } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import router from "../router/router";
import globalStyles from "./GlobalStyles";
import "~/bootstrap/i18n/init-i18n";

function App() {
  const theme = createTheme();
  /* ---------------------------------- Build --------------------------------- */
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={globalStyles} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
  /* -------------------------------------------------------------------------- */
}

export default App;
