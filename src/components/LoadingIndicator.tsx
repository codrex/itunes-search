import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export function LoadingIndicator() {
  return (
    <Box
      display="flex"
      width="100vw"
      height="100px"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  );
}
