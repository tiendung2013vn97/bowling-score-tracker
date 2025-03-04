import { Button } from "@mui/material";
import { gameTrackerHandler } from "services/DataHandler__GameTracker";

export function Button__FinishGame() {
  const isLastFrame = gameTrackerHandler.getCurrentFrame() === 10;
  if (!isLastFrame) return <></>;

  return (
    <Button variant="outlined" color="primary" size="large" type="submit">
      Finish game
    </Button>
  );
}
