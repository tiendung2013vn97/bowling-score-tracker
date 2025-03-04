import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";

const theme = createTheme({
  typography: {
    fontFamily: "monospace",
  },
});
export function GlobalTheme({ children }: React.PropsWithChildren) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
