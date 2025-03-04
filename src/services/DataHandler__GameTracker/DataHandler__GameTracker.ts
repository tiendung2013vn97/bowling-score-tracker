import { StorageHandler } from "services/StorageHandler";
import { BowlingScore, GameScore, SingleGameData } from "./types";
import { StorageType } from "services/StorageHandler/constants";
import { GameStep } from "./constants";
import { isLooselyNumber, isNull_Undefined_Empty } from "utils";
import { PlayerInfo } from "pages/Home/components/Panel__AddPlayer/types";

export class DataHandler__GameTracker {
  storage: StorageHandler;
  gameKey = "bowlingGame"; //keyname in local storage

  //use countUpdateKey,_gameData,_countUpdate to cache data and avoid querying data from localstorage constantly everytime component rerender
  countUpdateKey = "bowlingGameCountUpdate";
  _gameData: SingleGameData | null;
  _countUpdate: number;

  constructor() {
    this.storage = new StorageHandler({
      storageType: StorageType.localStorage,
    });
  }

  finishStep__InputUserInfos(playerInfos: PlayerInfo[]) {
    const gameData: SingleGameData = {
      currentStep: GameStep.InprogressGame,
      currentFrame: 1,
      playerInfos,
      scores: Object.fromEntries(
        playerInfos.map(({ name }) => [
          name,
          { frameScores: {}, totalScore: 0 } as GameScore,
        ])
      ),
      isGameFinished: false,
    };

    this.updateGameData(gameData);
  }

  finishCurrentGameFrame(): SingleGameData {
    const gameData = this.getGameData() as SingleGameData;

    if (gameData.currentFrame === 10) {
      gameData.currentStep = GameStep.ReviewResult;
      gameData.isGameFinished = true;
    } else gameData.currentFrame++;

    this.updateGameData(gameData);
    return gameData;
  }

  mutableCalculateGameScores(gameData: SingleGameData) {
    Object.keys(gameData.scores).map((playerName) => {
      const frameScores = gameData.scores[playerName].frameScores;
      const scoreList = Object.values(gameData.scores[playerName].frameScores)
        .flat()
        .filter((score) => !isNull_Undefined_Empty(score));

      gameData.scores[playerName].totalScore = this.calculateGameScore(
        scoreList,
        frameScores?.[10]?.filter((score) => !isNull_Undefined_Empty(score)) ||
          []
      );
    });
  }

  convertScoreTextToNumber(
    score: BowlingScore,
    previousRollScore: BowlingScore
  ): number {
    if (isNull_Undefined_Empty(score)) return 0;

    if (score === "X") return 10;

    if (score === "/")
      return 10 - (isLooselyNumber(previousRollScore) ? +previousRollScore : 0);

    return isLooselyNumber(score) ? +score : 0;
  }

  calculateGameScore(
    scores: BowlingScore[],
    scoresIn10thFrame: BowlingScore[]
  ) {
    let totalScore = 0;

    scores.forEach((score, index) => {
      const isUncountedExtraRoll =
        (scoresIn10thFrame[0] === "X" && index >= scores.length - 2) ||
        (scoresIn10thFrame[1] === "/" && index >= scores.length - 1);

      if (isUncountedExtraRoll) return;

      if (score === "X") {
        const nextRollScore = this.convertScoreTextToNumber(
          scores[index + 1],
          10
        );

        const next2RollScore = this.convertScoreTextToNumber(
          scores[index + 2],
          nextRollScore
        );

        totalScore += 10 + nextRollScore + next2RollScore;
        return;
      }

      if (score === "/") {
        const thisRollScore = this.convertScoreTextToNumber(
          scores[index],
          scores[index - 1]
        );

        const nextRollScore = this.convertScoreTextToNumber(
          scores[index + 1],
          thisRollScore
        );

        totalScore += thisRollScore + nextRollScore;
        return;
      }

      if (isLooselyNumber(score)) totalScore += +score;
    });

    return totalScore;
  }

  updateGameData(data: SingleGameData) {
    if (data.scores) this.mutableCalculateGameScores(data);

    this._gameData = data;
    this.storage.setDataByKey(this.gameKey, data);
    this.increaseCountUpdate();
  }

  getGameData(): SingleGameData | null {
    const storageCountUpdate = this.getCountUpdate();

    if (storageCountUpdate === this._countUpdate) return this._gameData;

    this._countUpdate = storageCountUpdate;
    this._gameData = this.storage.getDataByKey(this.gameKey);
    return this._gameData;
  }

  resetGameData() {
    this._gameData = null;
    this.storage.removeDataByKey(this.gameKey);
    this.storage.removeDataByKey(this.countUpdateKey);
  }

  getCurrentFrame() {
    return this.getGameData()?.currentFrame;
  }

  getWinner(): string[] {
    const gameData = this.getGameData();
    if (gameData?.currentStep !== GameStep.ReviewResult) return [];

    const totalScores = Object.values(gameData.scores).map(
      (score) => score.totalScore
    );
    const maxScore = Math.max(...totalScores);
    return Object.entries(gameData.scores)
      .filter(([_playerName, { totalScore }]) => totalScore === maxScore)
      .map((item) => {
        const playerName = item[0];
        return playerName;
      });
  }

  increaseCountUpdate() {
    const countUpdate = this.getCountUpdate();
    this._countUpdate++;
    this.storage.setDataByKey(this.countUpdateKey, countUpdate + 1);
  }

  getCountUpdate(): number {
    const countUpdateKey: number = this.storage.getDataByKey(
      this.countUpdateKey
    );

    return isLooselyNumber(countUpdateKey) ? +(countUpdateKey as any) : 0;
  }

  getCurrentStep() {
    return this.getGameData()?.currentStep || GameStep.InputPlayerInfo;
  }
}

export const gameTrackerHandler = new DataHandler__GameTracker();
