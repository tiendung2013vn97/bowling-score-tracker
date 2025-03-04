import { gameTrackerHandler } from "services/DataHandler__GameTracker";
import { GameStep } from "services/DataHandler__GameTracker/constants";
import { InprogressBoard } from "./components/InprogressBoard";
import { ReviewResult } from "./components/ReviewResult";

export function Page__GameTracker(): React.ReactElement {
  const currentStep = gameTrackerHandler.getCurrentStep();

  if (currentStep === GameStep.InprogressGame) return <InprogressBoard />;

  return <ReviewResult />;
}
