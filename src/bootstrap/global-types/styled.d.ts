import "styled-components";
import type { Theme } from "@mui/material";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
