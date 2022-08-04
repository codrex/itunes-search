import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";

import { store } from "../../store";
import { theme } from "../../theme";

export const PageSetup = ({children}: any) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
       {children}
      </ThemeProvider>
    </Provider>
  )
}