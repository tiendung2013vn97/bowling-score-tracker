import { ArrowRight } from "@mui/icons-material";
import { Button } from "@mui/material";
import { gameTrackerHandler } from "services/DataHandler__GameTracker";

export function Button__GoNextFrame() {
  const currentFrame = gameTrackerHandler.getCurrentFrame();
  if (currentFrame === 10) return <></>;

  return (
    <Button
      variant="contained"
      color="primary"
      endIcon={<ArrowRight />}
      size="large"
      type="submit"
    >
      Start next frame
    </Button>
  );
}
