import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { FormValues__AddPlayer } from "./types";
import { Typography } from "@mui/material";
import { Input__PlayerName } from "./Input__PlayerName";
import { Button__AddPlayer } from "./Button__AddPlayer";
import { Button__StartGame } from "./Button__StartGame";
import { ButtonGroup } from "styles";
import { useHistory } from "react-router-dom";
import { PagePath } from "constants/PagePath";
import { gameTrackerHandler } from "services/DataHandler__GameTracker";
import { useCallback } from "react";

export function Panel__AddPlayer() {
  const methods = useForm<FormValues__AddPlayer>({
    defaultValues: {
      players: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "players",
  });

  const history = useHistory();

  const onSubmit: SubmitHandler<FormValues__AddPlayer> = useCallback((data) => {
    gameTrackerHandler.finishStep__InputUserInfos(data.players);
    history.push(PagePath.GameTracker);
  }, []);

  return (
    <FormProvider {...methods}>
      <Typography variant="h5" component={"h1"} marginBottom={"2rem"}>
        Enter the player's name and Start game
      </Typography>

      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {fields.map((_, index) => (
          <Input__PlayerName index={index} remove={remove} />
        ))}

        <ButtonGroup>
          <Button__AddPlayer append={append} />
          <Button__StartGame />
        </ButtonGroup>
      </form>
    </FormProvider>
  );
}
