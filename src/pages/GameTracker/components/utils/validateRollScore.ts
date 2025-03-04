import {
  BowlingScore,
  FrameIndex,
} from "services/DataHandler__GameTracker/types";
import { RollIndex } from "../PlayerScorePerFrameRecord/types";
import { isLooselyNumber } from "utils";

export const validateRollScore =
  (rollIndex: RollIndex, scores: BowlingScore[], frameIndex: FrameIndex) =>
  (value: string): string | true => {
    if (rollIndex === 2 && isLooselyNumber(scores[0]) && !value)
      return "Roll 2 is required because Roll 1 is less than 10";

    if (!value) return true;
    if (!scores) scores = [];

    const roll1Regex = /^([0-9]|X)$/;
    const roll2Regex = /^([0-9]|\/)$/;
    const roll3Regex = /^([0-9]|X|\/)$/;

    if (rollIndex === 1 && !roll1Regex.test(value))
      return `Roll 1's score must be 0-9 or X character`;

    if (rollIndex === 2 && !roll2Regex.test(value))
      return `Roll 1's score must be 0-9 or / character`;

    if (rollIndex === 3 && !roll3Regex.test(value))
      return `Roll 1's score must be 0-9 or X or / character`;

    const invalidCase1 =
      frameIndex !== 10 && scores[0] === "X" && rollIndex == 2 && value;
    const invalidCase2 =
      frameIndex === 10 && scores[0] === "X" && rollIndex == 2 && value === "/";
    const invalidCase3 =
      frameIndex === 10 &&
      scores[0] === "X" &&
      scores[1] === "X" &&
      rollIndex == 3 &&
      value;

    if (invalidCase1 || invalidCase2 || invalidCase3)
      return "Invalid scores, please check it!";

    const invalidTotalScore =
      isLooselyNumber(scores[0]) &&
      isLooselyNumber(scores[1]) &&
      Number(scores[0]) + Number(scores[1]) >= 10;
    if (invalidTotalScore)
      return "Total score of roll 1 and 2 must less then 10";

    const invalidTotalScore2 =
      frameIndex === 10 &&
      isLooselyNumber(scores[1]) &&
      isLooselyNumber(scores[2]) &&
      Number(scores[1]) + Number(scores[2]) >= 10;
    if (invalidTotalScore2)
      return "Total score of roll 2 and 3 must less then 10";

    return true;
  };
