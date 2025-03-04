import { useCallback } from "react";
import { FormValues__AddPlayer } from "../components/Panel__AddPlayer/types";
import { useFormContext } from "react-hook-form";

export function useGetFormValidator__PlayerName() {
  const { getValues } = useFormContext<FormValues__AddPlayer>();
  const playerInfos = getValues("players");

  return useCallback(
    (value: string) => {
      const countDuplicatedName = playerInfos.filter(
        ({ name }) => name && name === value
      ).length;

      if (countDuplicatedName >= 2)
        return `Player name "${value}" already existed`;

      return true;
    },
    [playerInfos]
  );
}
