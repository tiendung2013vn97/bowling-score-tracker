import { Card, Grid2 as Grid, Typography } from "@mui/material";
import { gameTrackerHandler } from "services/DataHandler__GameTracker";
import { FrameIndex } from "services/DataHandler__GameTracker/types";
import { Input__Roll } from "./Input__Roll";

interface FnProps__PlayerScorePerFrameRecord {
  playerName: string;
  currentFrame: FrameIndex;
}

const rowSizeNotLastFrame = { xs: 12, sm: 6 };
const rowSizeLastFrame = { xs: 12, sm: 4 };

export function PlayerScorePerFrameRecord({
  playerName,
}: FnProps__PlayerScorePerFrameRecord) {
  const isLastFrame = gameTrackerHandler.getCurrentFrame() === 10;
  const rowSize = isLastFrame ? rowSizeLastFrame : rowSizeNotLastFrame;

  return (
    <Card variant="outlined" sx={{ padding: "1rem" }}>
      <Typography sx={{ marginBottom: "1.5rem" }}>
        Player: {playerName}
      </Typography>
      <Grid container spacing={2}>
        <Grid size={rowSize}>
          <Input__Roll playerName={playerName} rollIndex={1} />
        </Grid>
        <Grid size={rowSize}>
          <Input__Roll playerName={playerName} rollIndex={2} />
        </Grid>
        {isLastFrame && (
          <Grid size={rowSize}>
            <Input__Roll playerName={playerName} rollIndex={3} />
          </Grid>
        )}
      </Grid>
    </Card>
  );
}
