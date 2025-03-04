import { Box, LinearProgress } from "@mui/material";

export function Loading() {
  return (
    <Box
      sx={{
        width: "100%",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <LinearProgress sx={{ width: "100%" }} />
      <p>Loading page...</p>
    </Box>
  );
}
