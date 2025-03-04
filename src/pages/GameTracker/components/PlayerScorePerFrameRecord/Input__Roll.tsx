import { TextField } from "@mui/material";
import { FnProps__Input__Roll } from "./types";
import { useFormContext } from "react-hook-form";
import { FormValues__GameTracker } from "pages/GameTracker/types";
import { gameTrackerHandler } from "services/DataHandler__GameTracker";
import { validateRollScore } from "../utils/validateRollScore";
import { FrameIndex } from "services/DataHandler__GameTracker/types";

export function Input__Roll({ playerName, rollIndex }: FnProps__Input__Roll) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<FormValues__GameTracker>();
  const frameIndex = gameTrackerHandler.getCurrentFrame() as FrameIndex;
  const scores = watch(`scores.${playerName}.frameScores.${frameIndex}`);
  const error = (errors?.scores?.[playerName]?.frameScores as any)?.[
    frameIndex
  ]?.[rollIndex - 1];
  const inputName = `scores.${playerName}.frameScores.${frameIndex}.${rollIndex - 1}`;

  return (
    <TextField
      id="outlined-basic"
      label={`Roll ${rollIndex}`}
      variant="outlined"
      key={inputName}
      fullWidth
      {...register(inputName as any, {
        required: rollIndex === 1 ? "Roll 1's score is required" : false,
        validate: validateRollScore(rollIndex, scores, frameIndex),
      })}
      error={!!error}
      helperText={error?.message}
    />
  );
}
