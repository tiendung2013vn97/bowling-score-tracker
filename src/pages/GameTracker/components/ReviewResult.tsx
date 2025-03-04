import { Box, Typography } from "@mui/material";
import { ScoreBoardTable } from "./ScoreBoard";
import { Button__NewGame } from "./Button__NewGame";
import { gameTrackerHandler } from "services/DataHandler__GameTracker";
import { useMemo } from "react";

export function ReviewResult() {
  const winnerNames = useMemo(() => {
    return gameTrackerHandler.getWinner().join(", ");
  }, []);

  return (
    <Box>
      <Typography
        variant="h5"
        component={"h1"}
        marginBottom={"2rem"}
        sx={{
          textAlign: "center",
          backgroundColor: "lightblue",
          padding: "1rem",
        }}
      >
        Winner: {winnerNames}
      </Typography>

      <Typography variant="h5" component={"h1"} marginBottom={"2rem"}>
        Score board
      </Typography>

      <Box sx={{ margin: "2rem 0" }}>
        <ScoreBoardTable />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button__NewGame />
      </Box>
    </Box>
  );
}
