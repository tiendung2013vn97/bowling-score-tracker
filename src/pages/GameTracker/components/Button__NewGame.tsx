import { Button } from "@mui/material";
import { ConfirmModal } from "components";
import { PagePath } from "constants/PagePath";
import { useCallback, useState } from "react";
import { gameTrackerHandler } from "services/DataHandler__GameTracker";

export function Button__NewGame() {
  const [open, setOpen] = useState(false);

  const startNewGame = useCallback(() => {
    gameTrackerHandler.resetGameData();
    window.location.href = PagePath.HomePage;
  }, []);

  const onNewGameBtnClicked = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={onNewGameBtnClicked}
        size="large"
      >
        New game
      </Button>

      <ConfirmModal
        okText="Start new game"
        onOk={startNewGame}
        open={open}
        setOpen={setOpen}
        title="Do you want to close the current game and start new game?"
      />
    </div>
  );
}
