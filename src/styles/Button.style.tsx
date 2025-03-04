import { Box, styled } from "@mui/material";

export const ButtonGroup = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  alignContent: "center",
  flexWrap: "wrap",

  "& > button": {
    marginRight: "2rem",

    ":not(last-child)": {
      marginBottom: "1.5rem",
    },
  },
}));
