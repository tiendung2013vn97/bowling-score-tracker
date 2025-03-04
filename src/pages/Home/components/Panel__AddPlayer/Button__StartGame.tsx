import { PlayArrow } from "@mui/icons-material";
import { Button } from "@mui/material";

export function Button__StartGame() {
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      startIcon={<PlayArrow />}
      size="large"
    >
      Start game
    </Button>
  );
}
