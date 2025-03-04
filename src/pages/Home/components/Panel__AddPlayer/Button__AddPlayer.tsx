import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { FormValues__AddPlayer, PlayerInfo } from "./types";
import { useFormContext } from "react-hook-form";

interface FnProps__Button__AddPlayer {
  append: (data: PlayerInfo) => void;
}

export function Button__AddPlayer({ append }: FnProps__Button__AddPlayer) {
  const { getValues } = useFormContext<FormValues__AddPlayer>();
  const isHaving5Players = getValues("players")?.length === 5;

  return (
    <Button
      variant="outlined"
      color="primary"
      endIcon={<Add />}
      onClick={() => append({ name: "" })}
      size="large"
      disabled={isHaving5Players}
    >
      Add player
    </Button>
  );
}
