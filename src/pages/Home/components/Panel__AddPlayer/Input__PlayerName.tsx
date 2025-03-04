import { AccountCircle, Delete } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormValues__AddPlayer } from "./types";
import { useGetFormValidator__PlayerName } from "pages/Home/hooks";

interface FnProps__Input__PlayerName {
  index: number;
  remove: (index: number) => void;
}

export function Input__PlayerName({
  index,
  remove,
}: FnProps__Input__PlayerName) {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext<FormValues__AddPlayer>();

  const isOnlyOnePlayer = getValues("players")?.length === 1;
  const validatePlayerName = useGetFormValidator__PlayerName();

  return (
    <Box key={index} display="flex" alignItems="center" gap={2} mb={2}>
      <TextField
        label={`Player ${index + 1}`}
        {...register(`players.${index}.name`, {
          required: "Player name is required",
          maxLength: {
            value: 30,
            message: "Player name can't exceed 30 characters",
          },
          validate: validatePlayerName,
        })}
        error={!!errors?.players?.[index]?.name}
        helperText={errors?.players?.[index]?.name?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          },
        }}
        variant="standard"
        fullWidth
      />

      {!isOnlyOnePlayer && (
        <Button
          variant="outlined"
          color="error"
          startIcon={<Delete />}
          onClick={() => remove(index)}
        >
          Remove
        </Button>
      )}
    </Box>
  );
}
