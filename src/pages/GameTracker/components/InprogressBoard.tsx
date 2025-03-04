import { Box, Divider, Grid2 as Grid, Typography } from "@mui/material";
import { PlayerScorePerFrameRecord } from "./PlayerScorePerFrameRecord/PlayerScorePerFrameRecord";
import { useCallback, useMemo } from "react";
import { gameTrackerHandler } from "services/DataHandler__GameTracker";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  FrameIndex,
  SingleGameData,
} from "services/DataHandler__GameTracker/types";
import { ButtonGroup } from "styles";
import { Button__GoNextFrame } from "./Button__GoNextFrame";
import { Button__FinishGame } from "./Button__FinishGame";
import { Button__NewGame } from "./Button__NewGame";
import { ScoreBoardAccordion } from "./ScoreBoard";
import { FormValues__GameTracker } from "../types";
import { GameStep } from "services/DataHandler__GameTracker/constants";
import { PagePath } from "constants/PagePath";

const rowSize = { xs: 12, sm: 6 };

export function InprogressBoard(): React.ReactElement {
  const scores = useMemo(() => gameTrackerHandler.getGameData()?.scores, []);
  const methods = useForm<FormValues__GameTracker>({
    defaultValues: {
      scores,
    },
  });
  const playerInfos = useMemo(
    () => gameTrackerHandler.getGameData()?.playerInfos,
    []
  );

  const frameIndex = gameTrackerHandler.getCurrentFrame() as FrameIndex;
  const onSubmit: SubmitHandler<FormValues__GameTracker> = useCallback(
    (values) => {
      const gameData = gameTrackerHandler.getGameData() as SingleGameData;
      const newGameData: SingleGameData = {
        ...gameData,
        scores: values.scores,
      };

      gameTrackerHandler.updateGameData(newGameData);
      const updatedGameData = gameTrackerHandler.finishCurrentGameFrame();
      methods.reset({
        scores: updatedGameData.scores,
      });

      if (updatedGameData.currentStep === GameStep.ReviewResult)
        window.location.href = PagePath.GameTracker;
    },
    []
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Typography variant="h5" component={"h1"} marginBottom={"2rem"}>
          Frame {frameIndex}
        </Typography>
        <Grid container spacing={2}>
          {playerInfos?.map(({ name }) => (
            <Grid size={rowSize} key={name}>
              <PlayerScorePerFrameRecord
                playerName={name}
                currentFrame={frameIndex}
              />
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ margin: "2rem 0" }} />

        <ButtonGroup>
          <Button__GoNextFrame />
          <Button__FinishGame />
          <Button__NewGame />
        </ButtonGroup>

        <ScoreBoardAccordion />
      </form>
    </FormProvider>
  );
}
