import { PlayerInfo } from "pages/Home/components/Panel__AddPlayer/types";
import { GameStep } from "./constants";

export interface SingleGameData {
  currentStep: GameStep;
  currentFrame: FrameIndex;
  playerInfos: PlayerInfo[];
  scores: GameScores;
  isGameFinished: boolean;
}

export interface GameScores {
  [playerName: string]: GameScore;
}

export interface GameScore {
  frameScores: {
    [frameIndex in FrameIndex]: BowlingScore[];
  };
  totalScore: number;
}
export type BowlingScore = "/" | "X" | number;
export type FrameIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
